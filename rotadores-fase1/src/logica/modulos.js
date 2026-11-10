// Regla de negocio compartida entre modo demo y modo real: el Rotador solo
// ve los modulos activos, en el orden fisico de recorrido de la bodega.
export function modulosActivosOrdenados(modulos) {
  return modulos
    .filter((m) => String(m.Activo).trim().toLowerCase() === 'si')
    .slice()
    .sort((a, b) => Number(a.Orden) - Number(b.Orden));
}
