# Rotadores Fase 1

App unificada de rotación y frescura de producto terminado para la planta de
Tocancipá. Reemplaza las dos apps Capacitor separadas (rotador y supervisor)
por una sola app con login, selección de rol, y (a futuro) datos en listas de
SharePoint. **Este prototipo corre 100% local** — todos los datos reales
(SKUs, módulos, estado actual) están embebidos en el propio programa, sin
ninguna conexión a la nube — pensado para poder mostrarlo y probarlo tal cual
funcionaría, antes de conectarlo a SharePoint.

## Cómo abrir el prototipo

1. Genera el archivo autocontenido (una sola vez, o cada vez que cambies algo):
   ```bash
   cd rotadores-fase1
   npm install
   npm run build:standalone
   ```
2. Abre **`rotadores-fase1/dist/index.html`** haciendo doble clic — se abre
   directo en tu navegador (Chrome, Edge, Firefox), sin instalar nada ni
   levantar ningún servidor. Todo el código, los estilos y los datos de
   ejemplo quedan dentro de ese único archivo `.html`.

### Usuarios

Las cuentas no están en este repositorio:
- **Con la API corporativa** (`VITE_API_URL`): las cuentas viven en la tabla `usuarios_rotadores`, con la contraseña cifrada. Se asignan con `node scripts/asignar-clave.mjs <usuario>` en `api-rotadores`.
- **Modo local** (`VITE_MODO_LOCAL=si`, solo prototipo): las cuentas se leen de `src/datos/usuariosLocales.local.js`, que está fuera de Git. Ver `usuariosLocales.ejemplo.js`.

## Qué hace cada rol

- **Rotador**: al entrar (en modo demo, eligiendo su nombre de la lista de
  rotadores) elige el **turno** (Mañana/Tarde/Noche) y luego ve la pantalla
  de captura, con 3 pestañas: **Buscar posición** (buscador de módulos con
  filtro Todas/Revisadas/Pendientes — clic en una posición para Confirmar
  sin cambios o Editar el formulario completo; si otro Rotador la está
  editando en ese momento aparece marcada "🔒 en edición por..." y no se
  puede tocar hasta que la libere), **Conteos** (estado actual de todas las
  posiciones, en vivo) y **Resultado de la macro** (el mismo cálculo de la
  macro de Excel, en vivo) — estas dos últimas se actualizan solas con lo
  que captura cualquier Rotador conectado, gracias al tiempo real de
  Supabase. Al darle **Terminar turno** se cierra la sesión mostrando solo
  el **Histórico** completo (log append-only, nunca se edita ni se borra).
- **Supervisor**: tiene dos pestañas — **Tablero** (índice de frescura,
  tarjetas de aptitud APTO T1/T2/KA, filtros y detalle de todos los conteos)
  y **Rotadores** (crear o eliminar el personal autorizado para capturar).
- **Programador**: rol de **solo lectura**, pensado para consultar y
  exportar datos sin poder editar ni borrar nada. Tiene el mismo Tablero que
  el Supervisor, más 3 pestañas — Conteos, Historial y Resultado de la
  macro — cada una con un botón **⬇ Descargar Excel** que baja esa tabla
  completa como `.xlsx`. Es el rol que usa la [app de escritorio](#app-de-escritorio-windows-y-mac)
  (Windows/Mac).

## Verificación contra el Excel real

La lógica de `src/logica/macro.js` se comparó fila por fila contra los
valores que la macro de Excel (`Seg Rotacion OK.xlsm`) ya había calculado en
la hoja `Conteos`, usando la misma fecha de referencia (`Fecha Toma =
2026-06-11`): **738 de 740 filas con fecha de vencimiento coinciden
exactas** (días para vencer, estado, frescura, APTO T1/T2/KA, total cajas,
total unidades, hectolitros). Las 2 diferencias encontradas:

- Una fila con un dato del Excel desactualizado (la resta de fechas da 177
  días, no los 180 que muestra esa celda — error de la hoja, no del cálculo).
- Una fila con la columna `Bloquear = "Bloquear"` — regla ya incorporada:
  cuando un producto está bloqueado, la app oculta la frescura y pone
  APTO T1/T2/KA en "No", igual que el Excel (ver casilla "Bloquear este
  producto" en el formulario de Editar).

## Modo demo vs modo real

La app puede correr en dos modos, elegidos automáticamente según si hay
configuración de Entra ID / SharePoint:

- **Modo demo (memoria)**: sin login corporativo, con los datos reales
  embebidos directamente en el código (`src/datos/skusDemo.js`,
  `modulosDemo.js`, `conteosActualesDemo.js`) — 715 SKUs, 933 posiciones y
  el estado actual real de 813 de ellas, extraído directamente del Excel
  que usa hoy la planta (`Seg Rotacion OK.xlsm`, hoja `Conteos`). Lo que se
  captura vive solo en memoria del navegador y se pierde al recargar la
  página. Esto es lo que corre si **no** hay Supabase configurado (ver
  abajo).
- **Modo demo (Supabase, en línea)**: mismo login local de Rotador/
  Supervisor, pero leyendo y guardando en una base de datos real en la nube
  (gratis) — ver la sección **"Base de datos en línea (Supabase)"** más
  abajo. Es el modo que queda activo hoy en este proyecto.
- **Modo real**: inicio de sesión con la cuenta corporativa (Microsoft Entra
  ID) y lectura/escritura contra las listas reales de SharePoint vía
  Microsoft Graph.

Mientras el archivo `.env` tenga los valores de ejemplo (placeholders), el
botón "Entrar con Microsoft" queda deshabilitado y solo se puede usar el modo
demo — así se evita que MSAL falle con un `clientId` inválido.

## Base de datos en línea (Supabase)

Solo lo que cambia todo el tiempo vive en un proyecto gratis de
[Supabase](https://supabase.com) (Postgres + API REST + tiempo real, sin
costo): **Conteos, Historial, Rotadores**, los **Bloqueos de edición** (ver
más abajo) y **Resultado de la macro** (`resultado_macro` — la app la
recalcula y la vuelve a subir completa cada vez que algún Conteo cambia, así
queda consultable directo desde el Table Editor de Supabase sin abrir la
app). **Skus y Módulos NO están en Supabase** — son datos
maestros que casi no cambian, así que quedan embebidos directo en la app
(`src/datos/skusDemo.js`, `modulosDemo.js`), dentro del APK/HTML, sin gastar
cuota de la base de datos ni depender de internet para consultarlos.

Mientras `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén configurados
en `.env`, el modo demo usa esta base de datos en vez de memoria — así lo
que captura un Rotador en un celular aparece al instante en el tablero de
un Supervisor en otro dispositivo, y en la pantalla de otro Rotador
capturando al mismo tiempo, sin necesitar servidor propio.

**Varios Rotadores a la vez, sin pisarse el trabajo:** cuando alguien le da
"Editar" a una posición, la app avisa (tabla `bloqueos_edicion`) que esa
posición está en edición; los demás Rotadores la ven marcada
"🔒 en edición por <nombre>" y no pueden confirmarla ni editarla hasta que
la primera persona guarde o cancele. Si alguien cierra la app sin guardar,
el bloqueo se ignora solo después de 5 minutos (no hace falta que nadie lo
libere a mano).

**Tiempo real:** conteos, historial y bloqueos se sincronizan al instante
entre todos los dispositivos conectados vía Supabase Realtime (websockets),
usando el cliente oficial `@supabase/supabase-js`. Por eso en la pantalla de
"Buscar posición" del Rotador hay 3 pestañas junto a los filtros
Todas/Revisadas/Pendientes: **Conteos** (estado actual, formato de papel) y
**Resultado de la macro** (mismo cálculo/orden que el Excel) — ambas en vivo,
se actualizan solas con lo que captura cualquier Rotador conectado, sin
recargar la página. Al darle **"Terminar turno"** esas dos ya no hacen
falta (se vieron en vivo durante el turno): solo queda ver el **Histórico**
completo antes de salir.

**Cómo quedó armado:**

- [`scripts/supabase-schema.sql`](scripts/supabase-schema.sql): crea las
  tablas `conteos`, `historial`, `rotadores`, `bloqueos_edicion` y
  `resultado_macro` (se corre pegándolo en Supabase Dashboard → SQL Editor
  → Run — es seguro repetirlo).
  Incluye Row Level Security (RLS) con una política que permite todo con la
  clave `anon` (igual que el login local, no es seguridad real todavía), y
  activa Supabase Realtime sobre esas tablas.
- [`scripts/seed-supabase.mjs`](scripts/seed-supabase.mjs): sube los datos
  semilla reales (813 Conteos, Rotadores) la primera vez:
  ```bash
  SUPABASE_URL=https://tu-proyecto.supabase.co \
  SUPABASE_ANON_KEY=tu-clave-anon \
  node scripts/seed-supabase.mjs
  ```
- [`src/datos/supabaseProveedor.js`](src/datos/supabaseProveedor.js): habla
  con la API REST de Supabase (`fetch`) para leer/escribir, y con
  `@supabase/supabase-js` solo para la suscripción de tiempo real
  (`suscribirseCambios`), implementando la misma interfaz que ya usaban los
  demás proveedores.
- [`src/datos/colaSincronizacion.js`](src/datos/colaSincronizacion.js):
  soporte **offline** para Conteos/Historial/Rotadores — cada lectura guarda
  una copia en `localStorage`; si el celular se queda sin señal en medio de
  la bodega, esa copia se sigue mostrando. Cada escritura que falla por
  falta de red se guarda en una cola local y se reintenta sola cuando vuelve
  el internet (evento `online` del navegador + reintento cada 20 segundos).
- [`src/logica/posiciones.js`](src/logica/posiciones.js) (`bloqueoDe`,
  `bloqueoVigente`) y
  [`src/logica/macro.js`](src/logica/macro.js) (`calcularResultadoMacro`):
  lógica compartida entre el tablero del Supervisor y las tablas en vivo del
  Rotador, para que ambos calculen exactamente lo mismo.

**La clave `anon` es pública a propósito** (así funciona Supabase: la
protección real es Row Level Security en el servidor, no ocultar la clave)
— por eso puede quedar embebida en el código y en el HTML autocontenido sin
problema.

**Límites del plan gratis de Supabase**: 500MB de base de datos, 5GB de
transferencia al mes, 200 conexiones simultáneas de Realtime (de sobra para
este volumen de datos y de rotadores), y el proyecto se "duerme" si pasa una
semana sin uso — se reactiva solo con la primera petición, tarda unos
segundos.

## Configuración (modo real)

> Este despliegue ya tiene `SITE_ID`, `LIST_SKUS_ID`, `LIST_MODULOS_ID` y
> `LIST_CONTEOS_ID` cargados en `.env` (no se sube a git). Solo falta
> completar `VITE_TENANT_ID` y `VITE_CLIENT_ID` del registro de la app en
> Entra ID para activar el login real.

1. Copia `.env.example` a `.env` (si no existe ya):
   ```bash
   cp .env.example .env
   ```
2. Completa cada variable:

   | Variable | De dónde se obtiene |
   |---|---|
   | `VITE_TENANT_ID` | Microsoft Entra admin center → Identity → Overview → **Tenant ID** |
   | `VITE_CLIENT_ID` | Entra admin center → App registrations → tu app registrada → **Application (client) ID** |
   | `VITE_SITE_ID` | `GET https://graph.microsoft.com/v1.0/sites/{tuTenant}.sharepoint.com:/sites/{nombreDelSitio}` (con Graph Explorer o Postman) → campo `id` de la respuesta |
   | `VITE_LIST_SKUS_ID` | `GET https://graph.microsoft.com/v1.0/sites/{SITE_ID}/lists` → busca la lista `Skus` y toma su `id` |
   | `VITE_LIST_MODULOS_ID` | Igual que arriba, pero para la lista `Modulos` |
   | `VITE_LIST_CONTEOS_ID` | Igual que arriba, pero para la lista `Conteos` |
   | `VITE_LIST_HISTORIAL_ID` | Igual que arriba, pero para la lista `Historial` |
   | `VITE_LIST_ROTADORES_ID` | Igual que arriba, pero para la lista `Rotadores` |

3. En el registro de la app en Entra ID:
   - Tipo de plataforma: **SPA (Single-page application)**.
   - Redirect URI: la URL desde donde corre la app (ej. `http://localhost:5173` en desarrollo).
   - Permisos de API (delegados) de Microsoft Graph: `Sites.ReadWrite.All` y `User.Read`, con consentimiento de administrador si aplica.

### Listas de SharePoint requeridas

Crea las columnas **sin espacios ni tildes** (así el nombre interno de
SharePoint coincide con el nombre mostrado y no hace falta mapear nombres):

**`Skus`** (maestro, la app solo lee de aquí): `Codigo`, `Descripcion`,
`Familia`, `FactorCajas`, `CajXEstiba`, `Contenido`, `VidaUtil`,
`FLimiteDesp`, `MinimoT1`, `MinimoT2`, `MinimoKA`.

**`Modulos`** (posiciones fijas de bodega, la app solo lee de aquí): `Modulo`,
`Bodega` (One Way / Ret Pack / Carpas), `Fase` (A / B / C), `Orden`, `Activo`.
Solo se muestran al rotador los módulos con `Activo = "Si"`, en el orden
numérico de `Orden`. Estas columnas vienen del Excel real que usa hoy la
planta (`Seg Rotacion OK.xlsm`) — ojo que hay **41 nombres de `Modulo`
repetidos** en los datos reales (ej. "M_D1_DER" aparece dos veces); por eso
la app siempre identifica cada posición por `Orden`, nunca solo por el
nombre del módulo.

**`Conteos`** (estado ACTUAL de cada posición — un registro por módulo, se
actualiza en el mismo lugar, igual que la hoja "Conteos" del Excel real):
`Modulo`, `Orden`, `Codigo`, `Estibas`, `Cajas`, `Unidades`,
`FechaVencimiento`, `Usuario`, `Rol`, `FechaToma`, `Sede`, `Turno`,
`Estatus`, `Observaciones`, `Bloquear`. Al confirmar o editar una posición,
la app busca si ya existe un registro con ese `Orden`: si existe lo
actualiza (`PATCH`), si no lo crea (`POST`). `Estatus` es texto libre
(valores reales del Excel de referencia: `ENVASE`, `SALDO ND`,
`TAPA CODIGO`, `LLENANDO`, `RETENIDO`, `MAQUILA`, `BLOQUEADO`,
`EXPORTACION`). `Bloquear` es `"Bloquear"` o `"No"` — cuando está
bloqueado, la macro oculta frescura/unidades y fuerza APTO T1/T2/KA a "No".

**`Historial`** (log completo, la app solo agrega registros — nunca se
edita ni se borra): exactamente las mismas columnas que `Conteos`. Cada vez
que se confirma o edita una posición, además de actualizar `Conteos` se
agrega un registro nuevo aquí, para tener trazabilidad día a día por
posición (el Excel real no guarda esto — solo el estado actual — así que
esta lista es una mejora sobre cómo trabajan hoy).

**`Rotadores`** (plantilla de personal, la app lee/crea/**elimina**): `Nombre`,
`Codigo`, `Password`, `Activo`. A diferencia de `Conteos`/`Historial`, esta
lista sí se puede borrar desde la app — no es histórico, es la nómina de
quién puede operar hoy. `Password` es el login local (ver más abajo).

## Cómo correr en el navegador

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).
Sin `.env` configurado (o con los valores de ejemplo), solo verás el modo
demo — es la forma más rápida de probar la app.

## Cómo generar el HTML autocontenido (abrible con doble clic)

```bash
npm run build:standalone
```

Esto corre `vite build` y después `scripts/build-standalone.mjs`, que toma
`dist/index.html` + `dist/assets/*.js` + `dist/assets/*.css` y los combina
en un único `dist/index.html` sin ninguna referencia a archivos externos
(el motivo: un `<script type="module" src="...">` que apunta a *otro*
archivo local falla por CORS al abrirlo con `file://` en Chrome — pero un
`<script>` ya insertado dentro del mismo HTML sí funciona sin problema).
Ese archivo es 100% portátil: se puede copiar a un USB o enviar por correo
y se abre igual en cualquier computador, sin instalar nada.

## Cómo generar el APK (Android)

La app ya corre empaquetada como APK — compatible con **Android 10 (API 29)
en adelante** (`minSdkVersion = 24` en `android/variables.gradle`, así que
en la práctica cubre desde Android 7). El login, el Bloquear, las 3 tablas
y todos los datos reales embebidos funcionan igual que en el navegador,
porque es la misma build web empaquetada dentro del WebView de Capacitor.

Con Android Studio (recomendado si vas a firmar una versión de release):

```bash
npm run build          # genera dist/
npx cap sync            # copia el build web al proyecto Android
npx cap open android    # abre Android Studio para compilar/firmar el APK
```

Por línea de comandos, sin abrir Android Studio (esto fue lo que se usó para
generar el APK actual en este entorno):

```bash
# Requisitos (una sola vez, via Homebrew, sin necesitar contraseña de admin):
brew install openjdk@21
brew install --cask android-commandlinetools
# Aceptar licencias e instalar los paquetes del SDK:
SDK="$HOME/Library/Android/sdk"
CMDTOOLS="/opt/homebrew/Caskroom/android-commandlinetools/*/cmdline-tools"
yes | "$CMDTOOLS/bin/sdkmanager" --sdk_root="$SDK" --licenses
"$CMDTOOLS/bin/sdkmanager" --sdk_root="$SDK" "platform-tools" "platforms;android-35" "build-tools;35.0.0"
echo "sdk.dir=$SDK" > android/local.properties

# Build y empaquetado:
npm run build && npx cap sync android
cd android
JAVA_HOME="$(brew --prefix openjdk@21)" ANDROID_HOME="$HOME/Library/Android/sdk" ./gradlew assembleDebug
# el APK queda en android/app/build/outputs/apk/debug/app-debug.apk
```

> **Nota de versión de Java**: el Capacitor Android incluido en este
> proyecto necesita **Java 21** para compilar (no alcanza con Java 17) —
> si ves el error `invalid source release: 21`, es porque `JAVA_HOME`
> apunta a una versión más vieja.

Este `app-debug.apk` se puede instalar directo en cualquier celular Android
(activando "Instalar apps de origen desconocido" una vez) sin pasar por
Play Store — sirve para probarlo ya mismo en la planta. Para distribuirlo
de forma más permanente (o subirlo a Play Store) hace falta generar un APK
o AAB de **release**, firmado con una keystore propia (`./gradlew
assembleRelease`), lo cual queda pendiente para cuando se decida el canal
de distribución final.

**Nota sobre login real en tablet empaquetada**: dentro del WebView de
Capacitor en Android, el flujo de MSAL (`loginRedirect`) puede ser inestable
o quedar bloqueado por políticas de Google/Microsoft para WebViews
embebidos. Si el login real falla solo en el APK (y funciona bien en
navegador), la solución recomendada es agregar `@capacitor/browser` y abrir
el login en el navegador del sistema (Chrome Custom Tabs) en vez del WebView
embebido, capturando el retorno por deep link. Esto no hace falta para
probar la app en navegador de escritorio ni para usar el modo demo.

## App de escritorio (Windows y Mac)

Para el rol **Programador** (solo lectura + descargar Excel) hay una versión
empaquetada como app de escritorio nativa, con [Electron](https://www.electronjs.org/)
— la misma app web de siempre, dentro de una ventana propia, sin necesitar
Chrome/Edge abierto ni conexión a Android.

```bash
npm run desktop:build:mac   # genera .dmg y .zip para Mac (Apple Silicon e Intel)
npm run desktop:build:win   # genera un .exe portable para Windows (x64), sin instalador
```

Los archivos quedan en `release/`:
- **Mac**: `Rotadores Fase 1-0.0.0-arm64.dmg` (Apple Silicon: M1/M2/M3/M4) y
  `Rotadores Fase 1-0.0.0.dmg` (Intel). Se abre el `.dmg` y se arrastra la
  app a Aplicaciones, como cualquier otro programa de Mac.
- **Windows**: `Rotadores Fase 1 0.0.0.exe` — es "portable": no hay que
  instalarlo, se ejecuta directo con doble clic.

> **La app no está firmada digitalmente** (firmar cuesta una suscripción de
> desarrollador, tanto en Apple como en Windows). Por eso, la primera vez
> que se abra:
> - **Mac**: va a decir que no se puede verificar el desarrollador. Clic
>   derecho sobre la app → **Abrir** → confirmar "Abrir" en el cuadro de
>   diálogo (solo la primera vez).
> - **Windows**: "Microsoft Defender SmartScreen" puede avisar que es de un
>   editor desconocido. Clic en **Más información** → **Ejecutar de todas
>   formas**.

Al abrir la app, se entra igual que en el navegador: elige el rol
**Programador** con su usuario y contraseña (ver
sección de arriba) — desde ahí se ve el Tablero y las 3 tablas (Conteos,
Historial, Resultado de la macro), cada una con su botón de descargar Excel.
El código del proceso principal de Electron está en
[`electron/main.cjs`](electron/main.cjs) — solo abre una ventana con
`dist/index.html` (la misma build autocontenida del HTML standalone), no
tiene ninguna lógica propia.

## Estructura del proyecto

```
scripts/
  build-standalone.mjs       inline de JS+CSS+favicon en dist/index.html (ver seccion de arriba)
src/
  config.js                 configuración leída de .env
  auth/                      MSAL: configuración, provider, hook de autenticación
  datos/
    skusDemo.js              maestro real de SKUs (715), embebido — sin fetch
    modulosDemo.js           maestro real de posiciones (933), embebido — sin fetch
    conteosActualesDemo.js   estado actual real (813 posiciones), extraido del Excel
    datosDemo.js             rotadores semilla
    demoProveedor.js         proveedor en memoria para el modo demo
    graphProveedor.js        proveedor real contra Microsoft Graph (para cuando se conecte a SharePoint)
  logica/macro.js            cálculos de negocio (única fuente de verdad)
  logica/modulos.js          filtrado/orden de módulos activos (Activo="Si", por Orden)
  logica/posiciones.js       estado actual de una posición (por Orden) y si ya se revisó en el turno actual
  contexto/                  estado de sesión (modo, rol, usuario, turno)
  hooks/                     useDatos (carga/error), useTema (claro/oscuro)
  componentes/
    login/                   pantalla de login + selector de rol
    rotador/                 selector de turno, buscador de posiciones, detalle confirmar/editar, formulario, resumen del turno
    supervisor/              pestañas Tablero (índice de frescura, APTO, filtros, tabla) y Rotadores (crear/eliminar)
    comunes/                 piezas reutilizables (tabla, tarjetas, estados de carga/error/vacío)
```

## La lógica de cálculo ("la macro")

Implementada en [`src/logica/macro.js`](src/logica/macro.js), se calcula EN
VIVO cada vez (nunca se guarda en SharePoint) porque depende de la fecha de
hoy y del cruce con el maestro de SKUs:

- `diasParaVencer = FechaVencimiento − hoy`
- `Estado`: Vencido / <10 / <30 / <60 / <90 / <120 / >120 días
- `Frescura = diasParaVencer / VidaUtil`
- `APTO T1 = diasParaVencer >= MinimoT1`
- `APTO T2 = diasParaVencer >= MinimoT2`
- `APTO KA = diasParaVencer > MinimoKA`
- `TotalCajas = Cajas + Estibas × CajXEstiba`
- `TotalUnidades = Unidades + TotalCajas × FactorCajas`
- `Hectolitros = TotalUnidades × Contenido / 100000`

Si `Bloquear = "Bloquear"`: `Frescura` y `TotalUnidades` quedan en blanco,
`Hectolitros = 0`, y `APTO T1/T2/KA = "No"` sin importar la fecha —
`Estado` y `TotalCajas` se siguen calculando normal (así se comporta el
Excel real).

El "Orden" que se muestra en el tablero del Supervisor y en "Resultado de
la macro" **no es la posición física del módulo** (esa es otra cosa, ver
`logica/modulos.js`): es el ranking que arma la macro al agrupar los
conteos por Familia y luego por Código (mismo producto siempre junto), y
dentro de cada producto ordenar del que vence primero al que vence de
último — igual que la hoja `PivForm` del Excel. Ver `ordenarComoLaMacro`
en `src/logica/macro.js`.
