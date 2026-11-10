# Limpieza pendiente — duplicados exactos de módulos mixtos

Corte: 2026-09-22.

Al corregir la fragmentación del catálogo (41 módulos que existían con
más de un "Orden" para la misma posición física), se encontró que de
132 registros de `conteos` en esas posiciones:

- **38 eran productos realmente distintos** — ya se reasignaron por API
  (`PATCH /conteos/:id`, cambiando solo el campo `Orden` al de la
  posición correcta). Completado 2026-09-22, sin pérdida de datos.
- **54 eran duplicados exactos** (mismo Código en la misma posición,
  producto de la fragmentación) — **quedan pendientes de borrar**
  porque el servidor de Tecnología todavía no tenía desplegada la ruta
  `DELETE /conteos/:id` en el momento del corte (devolvía 404).

## Cómo completar la limpieza

Una vez Tecnología confirme que `api-rotadores` ya tiene la ruta
`DELETE /conteos/:id` desplegada (ver commit `e3c92cf` del repo),
correr por cada id en `ids_a_borrar.json`:

```
DELETE https://rotadores.ienm.com.co/api/conteos/{id}
```

En cada caso ya se validó que el registro que **se conserva** (el más
reciente) quedó con el `Orden` correcto — borrar estos ids no pierde
ningún dato real, son copias exactas y más viejas del mismo producto.
