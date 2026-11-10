// Turnos de la planta, asignados automáticamente por la hora:
//   6-2  → 06:00 a 13:59
//   2-10 → 14:00 a 21:59
//   10-6 → 22:00 a 05:59 (cruza la medianoche: lo de la madrugada
//          pertenece al día en que EMPEZÓ el turno)
export const TURNOS = ['6-2', '2-10', '10-6'];
export const HORARIO_TURNO = { '6-2': '6:00 a. m. – 2:00 p. m.', '2-10': '2:00 p. m. – 10:00 p. m.', '10-6': '10:00 p. m. – 6:00 a. m.' };

const dos = (n) => String(n).padStart(2, '0');
const fechaLocal = (d) => `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;

export function turnoDe(fecha = new Date()) {
  const d = new Date(fecha);
  const h = d.getHours();
  if (h >= 6 && h < 14) return { nombre: '6-2', dia: fechaLocal(d) };
  if (h >= 14 && h < 22) return { nombre: '2-10', dia: fechaLocal(d) };
  // 10-6: entre 00:00 y 05:59 el turno empezó el día anterior
  const inicio = new Date(d);
  if (h < 6) inicio.setDate(inicio.getDate() - 1);
  return { nombre: '10-6', dia: fechaLocal(inicio) };
}

export const turnoActual = () => turnoDe(new Date());

// Identificador único de un turno concreto (día + franja). Dos registros son
// del mismo turno si su clave coincide.
export const claveTurno = (fecha) => {
  const t = turnoDe(fecha);
  return `${t.dia}|${t.nombre}`;
};

// ¿Este registro (con FechaToma) se tomó en el turno que está corriendo ahora?
export function esDelTurnoActual(registro, ahora = new Date()) {
  if (!registro?.FechaToma) return false;
  return claveTurno(registro.FechaToma) === claveTurno(ahora);
}
