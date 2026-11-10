# Migración de datos — Rotadores Fase 1

Listo para cargar en el esquema `progreso`. `02_conteos.sql` ya quedó regenerado con el
catálogo correcto de **933 posiciones** (ver nota de corrección abajo) — no hace falta
ninguna validación adicional antes de cargarlo.

## Contenido y orden de carga

| Orden | Archivo | Filas | Qué es |
|---|---|---|---|
| 1 | `01_usuarios.sql` | 5 | Cuentas del piloto (Rotador/Supervisor/Programador/Admin) |
| 2 | `02_conteos.sql` | 933 | Estado actual de cada posición — catálogo completo y correcto |
| 3 | `03_historial.sql` | 6 | Log histórico de conteos guardados |
| 4 | `04_bloqueos.sql` | 0 | Vacío al momento del corte (normal, son temporales) |
| 5 | `05_resultado_macro.sql` | — | No incluido a propósito — ver nota abajo |

## Corrección aplicada — catálogo de 933 posiciones

El export anterior traía el catálogo viejo de 913 posiciones (ya identificado como
desactualizado). `02_conteos.sql` se regeneró completo a partir de las fuentes propias
de la app, que ya están corregidas: el catálogo de 933 posiciones
(`src/datos/modulosDemo.js`, regenerado el 2026-08-18 directo del Excel real) cruzado
con el estado actual conocido de cada posición (`src/datos/conteosActualesDemo.js`).

De las 933 posiciones: **813 traen su último estado real conocido** (código, estibas,
cajas, unidades, fecha de vencimiento, estatus) y **120 quedan vacías** porque nunca se
han contado — eso es normal, no un error del export. Todas quedan marcadas con
`Usuario = 'carga.inicial@rotadores.local'` para distinguir esta carga inicial de una
captura real hecha por un Rotador desde la app.

El archivo de 913 posiciones queda respaldado en
`../backup_migracion_913/02_conteos_913_obsoleto.sql` por si hace falta comparar — **no
usarlo**, es el catálogo viejo.

## `resultado_macro` — no se migra, se genera solo

**No incluimos `05_resultado_macro.sql`.** Esa tabla la recalcula por completo el propio
aplicativo (`PUT /resultado-macro`) cada vez que se guarda un conteo — reemplaza toda la
tabla de una vez. Lo único que Tecnología debe confirmar es que el usuario técnico de la
base tenga permiso de **borrar e insertar sobre toda la tabla**, no solo de actualizar
fila por fila; si el permiso solo alcanza para actualizar, esa auto-actualización va a
fallar en silencio.

## ⚠️ Contraseñas excluidas a propósito

`01_usuarios.sql` trae la contraseña de cada cuenta reemplazada por el texto
`CAMBIAR_ESTA_CONTRASENA` — las contraseñas originales del piloto se guardaban en texto
plano, y subir eso a un repositorio (aunque sea privado) es un riesgo innecesario.
**Antes de dar por cerrado el corte, alguien con acceso a la base debe poner una
contraseña real a cada usuario.**

## Cómo cargarlo

```bash
psql "$CONNECTION_STRING" -f 01_usuarios.sql
psql "$CONNECTION_STRING" -f 02_conteos.sql
psql "$CONNECTION_STRING" -f 03_historial.sql
psql "$CONNECTION_STRING" -f 04_bloqueos.sql
# resultado_macro: no se carga por SQL, se llena sola con el primer conteo que se guarde
```

Los `insert ... on conflict do nothing` hacen que sea seguro volver a correrlos si algo
falla a mitad de camino — no van a duplicar filas.
