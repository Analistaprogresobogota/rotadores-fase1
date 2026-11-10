# api-rotadores

API intermedia entre el aplicativo **Rotadores Fase 1** y la base de datos Postgres de Tecnología (Azure Database for PostgreSQL). Reemplaza a Supabase: el aplicativo le habla a esta API por HTTP, y esta API es la única que se conecta directamente a la base de datos.

```
App Rotadores (Android / Windows / macOS)
        │  HTTPS
        ▼
   api-rotadores  (este proyecto)
        │  conexión Postgres (host/puerto/usuario/contraseña)
        ▼
Base de datos "dbgroot" en Azure
```

## Por qué existe

El aplicativo no puede conectarse directo a la base de datos: ni el navegador ni el APK/exe pueden hablar el protocolo de Postgres, y aunque pudieran, sería un riesgo grave guardar la contraseña de la base dentro de una app instalada en varios dispositivos. Esta API hace de intermediario: recibe peticiones HTTP normales del aplicativo y es la única que usa las credenciales reales de la base de datos.

Nota: si ya montaron `api-roturas` (la misma pieza para la app de Roturas), esta API sigue exactamente el mismo patrón — pueden correr las dos en el mismo servidor, en puertos distintos.

## 1. Preparar la base de datos (una sola vez)

Conectarse a la base `dbgroot` (por ejemplo con DBeaver) y correr el contenido de [`schema.sql`](./schema.sql). Es seguro volver a correrlo si hace falta — usa `if not exists`.

Crea 5 tablas: `conteos`, `historial`, `bloqueos_edicion`, `resultado_macro` y `usuarios_rotadores`. El detalle completo de cada columna está en el documento `Documentación/Aplicativo 2 - Rotadores - Base de datos - Especificacion para Tecnologia.docx`, en la carpeta raíz del proyecto Rotadores.

**Importante:** las columnas de `conteos`, `historial`, `bloqueos_edicion` y `resultado_macro` van con mayúscula inicial entre comillas (`"Orden"`, `"Modulo"`, etc.) — hay que respetar exactamente eso, si no Postgres las vuelve minúsculas solas y dejan de coincidir con lo que espera la API.

## 2. Configurar y correr la API

Requiere Node.js 18 o superior.

```bash
cd api-rotadores
npm install
cp .env.example .env
```

Completar `.env` con los datos de conexión que entregue Tecnología por su mecanismo de secretos (nunca se escriben en el repositorio):

```
PGHOST=<servidor de Azure Database for PostgreSQL>
PGPORT=5432
PGDATABASE=<base>
PGUSER=<identidad técnica de la API>
PGPASSWORD=<contraseña>
PGSCHEMA=progreso
PORT=3002
CORS_ORIGIN=<URL de la app, separadas por coma>
AUTH_SECRET=<48+ caracteres aleatorios, ver .env.example>
```

Sin `AUTH_SECRET` (mínimo 32 caracteres) la API **no arranca**: es el secreto con el que se firman las sesiones.

Correr:

```bash
npm start
```

Debe imprimir `API de Rotadores escuchando en el puerto 3002`. Para confirmar que sí llega a la base de datos:

```bash
curl http://localhost:3002/salud
# esperado: {"estado":"ok","base_de_datos":"conectada"}
```

Después de cargar `seed-usuarios.sql` (o la migración), asignar la contraseña de cada usuario. Las contraseñas **no están en los archivos SQL**; el script las genera, las guarda cifradas y las muestra una sola vez:

```bash
node scripts/asignar-clave.mjs admin
```

## Seguridad (noviembre 2026)

- **Sesión obligatoria:** `POST /usuarios/login` entrega un token firmado (HMAC-SHA256, vence a las 12 h). Todas las demás rutas, excepto `/salud`, lo exigen en `Authorization: Bearer <token>`. Los flujos de eventos (`/…/eventos`) lo reciben en `?token=` porque EventSource no permite cabeceras.
- **Permisos por rol, en el servidor:**
  - Lectura: cualquier rol con sesión.
  - Conteos, historial, bloqueos y resultado-macro: solo **Rotador** y **Admin**.
  - Gestión de usuarios: solo **Admin**.
  - Un Rotador solo puede registrar a su propio nombre.
- **Contraseñas cifradas** con scrypt (`scrypt$sal$hash`). Las que estuvieran en texto plano se cifran solas la primera vez que la persona entra. No se aceptan claves débiles: mínimo 8 caracteres, con letras y números, distintas del usuario.
- **Bloqueo:** 5 intentos fallidos en 15 minutos bloquean ese usuario 15 minutos. Cuenta también para usuarios inexistentes, para no revelar cuáles existen.
- **Validación de datos:** números no negativos, fechas reales, textos de máximo 500 caracteres y JSON válido.
- **Concurrencia:** `PUT /resultado-macro` usa un candado de transacción. Antes, varios dispositivos a la vez chocaban con `duplicate key`.

Límites conocidos:
- El bloqueo por intentos y los eventos en tiempo real viven en memoria, así que valen para **una sola instancia** de la API.
- La conexión a Azure usa `rejectUnauthorized: false` (ver `src/db.js`).

## Pruebas

`pruebas/pruebas_api.py` corre 32 casos de seguridad, validación y funcionamiento contra una API **local** y relee la base con `psql`. Nunca se corre contra la base corporativa. Necesita:
- un Postgres local con `schema.sql`;
- usuarios de prueba `tadmin`, `tsup`, `tprog`, `trot`, `trot2` y `tsin`;
- la versión anterior en el puerto 3101 y la nueva en el 3102, con `PGSSL=no`.

Resultado al 2026-11-10: **32/32 PASS** en la versión nueva; la anterior fallaba 21 de esos casos.

## 3. Firewall de Azure

Azure Database for PostgreSQL bloquea por IP. Hay que agregar, en las reglas de firewall de la base `dbgroot`, la IP pública desde donde va a correr esta API en producción.

## 4. Desplegarla en un servidor real

Igual que `api-roturas`: Azure App Service (Node.js), Azure Container Apps, o el mecanismo que Tecnología ya use para correr servicios internos. La API debe quedar accesible por una URL HTTPS, que luego se configura en el aplicativo (`VITE_API_URL`, ver `.env.example` del proyecto `rotadores-fase1`).

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/salud` | Verifica que la API está viva y conectada a la base de datos (sin sesión). |
| GET | `/conteos` | Estado actual de todas las posiciones. |
| POST | `/conteos` | Crea un conteo nuevo (Rotador, Admin). |
| PATCH | `/conteos/:id` | Edita un conteo existente (Rotador, Admin). |
| DELETE | `/conteos/:id` | Borra un conteo puntual (Rotador, Admin). |
| GET | `/conteos/eventos` | SSE: avisa cuando algo cambió en Conteos (reemplaza tiempo real de Supabase). |
| GET | `/historial` | Log completo, más reciente primero (append-only). |
| POST | `/historial` | Agrega una fila nueva. |
| GET | `/historial/eventos` | SSE para Historial. |
| GET | `/bloqueos` | Bloqueos de edición vigentes. |
| POST | `/bloqueos` | Crea/reemplaza el bloqueo de una posición. |
| DELETE | `/bloqueos/:orden` | Libera una posición. |
| GET | `/bloqueos/eventos` | SSE para Bloqueos. |
| GET | `/resultado-macro` | Snapshot más reciente de MPRot calculado. |
| PUT | `/resultado-macro` | Reemplaza todo el contenido (lo hace la app tras cada cambio). |
| POST | `/usuarios/login` | Valida usuario/contraseña en el servidor y entrega el token de sesión. |
| GET | `/usuarios` | Todas las cuentas, sin contraseñas (Admin). |
| POST | `/usuarios` | Crea una cuenta nueva, con contraseña cifrada (Admin). |
| PATCH | `/usuarios/:id` | Cambia nombre, rol, estado o contraseña (Admin). |
| DELETE | `/usuarios/:id` | Elimina una cuenta (Admin; no la propia). |

## Nota sobre esto siendo un "piloto→producción"

Esta API queda pensada para vivir dentro de la infraestructura de Tecnología (junto a la base de datos), no como algo que dependa de un plan gratuito de otro proveedor — es la pieza que permite que el aplicativo deje de depender de Supabase y pase a ser la solución definitiva.
