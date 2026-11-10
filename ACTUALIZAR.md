# Actualizar Rotadores Fase 1 (versión de noviembre 2026)

Guía para Tecnología: actualizar la API (`api-rotadores`) y la app (`rotadores-fase1`) que ya tienen desplegadas. Tiempo estimado: 20 minutos más la compilación de la app.

**Importante:** API y app se actualizan **juntas**. La API nueva exige un pase de sesión que las apps viejas no envían. Una app sin actualizar dejará de cargar datos apenas se actualice la API.

## Qué cambia

- La API exige sesión en todas las rutas, excepto `/salud` y el login, y revisa el rol en el servidor.
- Las contraseñas pasan a guardarse cifradas. Las actuales **siguen funcionando** y se cifran solas la primera vez que cada persona entra; no hay que hacer nada para eso.
- Bloqueo de 15 minutos tras 5 intentos fallidos, validación de datos y corrección de un error con varios dispositivos guardando a la vez.
- No hay cambios en la base de datos: mismas tablas y columnas, sin migraciones.

## 0. Antes de empezar

Hacer una copia de la carpeta actual de la API (con su `.env`) y de la app instalada: es el camino para volver atrás.

Código de esta versión: https://github.com/Analistaprogresobogota/rotadores-fase1 (público, versión de noviembre 2026).

## 1. API (`api-rotadores`)

```bash
git clone https://github.com/Analistaprogresobogota/rotadores-fase1.git
cp <carpeta actual de la API>/.env rotadores-fase1/api-rotadores/.env    # se conserva la configuración actual
cd rotadores-fase1/api-rotadores
npm ci
```

Agregar al `.env` (los demás valores no cambian):

```bash
# Secreto para firmar las sesiones: obligatorio, sin él la API no arranca.
# Generarlo una vez y guardarlo en el gestor de secretos:
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
AUTH_SECRET=<el valor generado>
SESION_HORAS=12
```

Sobre `CORS_ORIGIN`: la sesión viaja en una cabecera, no en cookies, así que `CORS_ORIGIN=*` es seguro. Para restringirlo, la lista debe incluir:
- la URL de la versión web;
- `https://localhost`, que es el origen de la app Android;
- `null`, que es el origen de la app de escritorio (Electron).

Reiniciar el servicio de la API, ahora apuntando a esta carpeta.

### Verificar la API

| Prueba | Resultado esperado |
|---|---|
| `curl https://<api>/salud` | `{"estado":"ok","base_de_datos":"conectada",…}` |
| `curl -i https://<api>/conteos` (sin sesión) | `401` y `{"error":"sesion"}` |
| `curl -i -X OPTIONS https://<api>/conteos -H 'Origin: https://localhost' -H 'Access-Control-Request-Method: GET'` | Incluye `Access-Control-Allow-Origin: https://localhost` (Android) |
| Login de un usuario real desde la app nueva | Entra y ve sus datos |
| En la base: `select left("Password",7) from progreso.usuarios_rotadores where "Usuario"='<ese usuario>'` | `scrypt$`: su contraseña ya quedó cifrada |

## 2. App (`rotadores-fase1`)

Se compila igual que antes, con el mismo `.env` (`VITE_API_URL` apuntando a la API):

```bash
cd rotadores-fase1
npm ci
npm run build                          # versión web: carpeta dist/
npm run desktop:build:win              # Windows (portable .exe en release/)
npm run desktop:build:mac              # macOS (.dmg en release/)
npx cap sync android                   # Android: luego compilar el APK como siempre
```

Instrucciones detalladas del APK: README de `rotadores-fase1`, sección «Cómo generar el APK».

Con npm 11 o superior, si la compilación de escritorio falla al empaquetar, primero hay que aprobar los scripts de instalación con `npm install-scripts approve electron-winstaller` y luego repetir `npm ci`.

Distribuir la app nueva a los dispositivos **el mismo día** que se actualiza la API.

## 3. Contraseñas

No requieren ninguna acción para la actualización: las actuales siguen funcionando y se cifran solas al primer ingreso. Si hace falta cambiar alguna, el Admin lo hace desde la app en **Usuarios → Cambiar contraseña**. La app sugiere una clave segura, la guarda cifrada y la muestra una sola vez.

Como alternativa sin entrar a la app, desde el servidor: `cd api-rotadores && node scripts/asignar-clave.mjs <usuario>`.

## Volver atrás

Volver a poner en servicio la copia de la API y la app guardada en el paso 0. No hay que tocar la base de datos.

Las contraseñas que ya se cifraron dejarán de funcionar con la versión anterior; esas cuentas se restablecen con un `UPDATE` de la columna `"Password"`.

## Pruebas

Esta guía se probó en una copia limpia del repositorio: dependencias instaladas desde cero, `.env` armado según el paso 1, la API con un Postgres local y la app compilada. Todas las verificaciones dieron el resultado esperado, incluido el ingreso con una contraseña anterior, que quedó cifrada al entrar.


`api-rotadores/pruebas/pruebas_api.py` corre 32 casos de seguridad y funcionamiento contra una API y un Postgres **locales**. Resultado de esta versión: 32/32 PASS. Ver `api-rotadores/README.md`, sección Pruebas.
