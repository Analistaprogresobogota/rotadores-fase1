export function redondear(numero, decimales) {
  const factor = 10 ** decimales;
  return Math.round(numero * factor) / factor;
}

export function formatoPorcentaje(parte, total) {
  if (!total) return 0;
  return Math.round((parte / total) * 100);
}
