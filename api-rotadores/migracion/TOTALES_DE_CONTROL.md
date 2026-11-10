# Totales de control — migración Rotadores Fase 1

Corte de `02_conteos.sql`: 2026-09-17, regenerado desde el catálogo corregido de 933
posiciones (`modulosDemo.js` + `conteosActualesDemo.js`). Ver `README.md` para el detalle
de la corrección.

## Origen

| Tabla | Filas | Fuente |
|---|---|---|
| `usuarios_rotadores` | 5 | Export de Supabase |
| `conteos` | 933 | Catálogo corregido (813 con estado real capturado, 120 posiciones aún sin contar) |
| `historial` | 6 | Export de Supabase |
| `bloqueos_edicion` | 0 | Export de Supabase |
| `resultado_macro` | — | No aplica — la genera la app sola, no se migra por SQL |

## Archivos generados

| Archivo | Filas que inserta |
|---|---|
| `01_usuarios.sql` | 5 |
| `02_conteos.sql` | 933 |
| `03_historial.sql` | 6 |
| `04_bloqueos.sql` | 0 (archivo vacío, normal) |

## Cómo reconciliar después de cargar

```sql
select count(*) from progreso.usuarios_rotadores;  -- debe dar 5
select count(*) from progreso.conteos;             -- debe dar 933
select count(*) from progreso.historial;           -- debe dar 6
select count(*) from progreso.bloqueos_edicion;     -- debe dar 0
```

Después, al guardar el primer conteo desde la app, confirmar que `resultado_macro` se
haya llenado sola:

```sql
select count(*) from progreso.resultado_macro;  -- debe ser > 0 tras el primer guardado
```

Si algún número no coincide, **no continúes con el corte** — revisa qué falló antes de
seguir.
