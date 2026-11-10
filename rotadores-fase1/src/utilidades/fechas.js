const MS_POR_DIA = 1000 * 60 * 60 * 24;

// Diferencia en dias completos entre dos fechas, ignorando la hora
// (para que "hoy" siempre sea el dia calendario, sin importar horas/minutos).
export function diasEntre(desde, hasta) {
  const a = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
  const b = new Date(hasta.getFullYear(), hasta.getMonth(), hasta.getDate());
  return Math.round((b - a) / MS_POR_DIA);
}

// Convierte "YYYY-MM-DD" a Date local sin desfase de zona horaria
// (new Date("YYYY-MM-DD") a secas lo interpreta en UTC y puede correr el dia).
export function parsearFechaLocal(fechaISO) {
  if (!fechaISO) return null;
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

export function formatoISODate(date) {
  return date.toISOString().slice(0, 10);
}

export function formatoISODatetime(date) {
  return date.toISOString();
}

export function formatoFechaLegible(fechaISO) {
  if (!fechaISO) return '—';
  const f = parsearFechaLocal(fechaISO.slice(0, 10));
  return f.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Version larga y legible, para confirmar visualmente una fecha escrita a mano
// (ej. "31 de agosto de 2026").
export function formatoFechaLarga(fechaISO) {
  if (!fechaISO) return '—';
  const f = parsearFechaLocal(fechaISO.slice(0, 10));
  return f.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
}
