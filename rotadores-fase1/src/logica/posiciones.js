import { esDelTurnoActual } from '../utilidades/turnos';

// Reglas de negocio para el flujo de captura por posicion (Rotador).
// `conteos` es el estado ACTUAL de cada posicion, igual que la hoja
// "Conteos" del Excel real. Normalmente hay un solo registro por Orden, pero
// un modulo "mixto" (con 2 o mas productos distintos guardados ahi) puede
// tener varios — por eso todo se maneja como lista, nunca se asume un unico
// registro. Se busca por `Orden` (no por Modulo) porque hay nombres de
// modulo repetidos en la bodega real.

// Todos los registros actuales de una posicion (uno por producto que tenga
// guardado ahi — normalmente 1, mas de 1 si es un modulo mixto).
export function estadosActualesDe(orden, conteos) {
  return conteos.filter((c) => c.Orden === orden);
}

// El primer/unico estado actual de una posicion, o null si nunca se ha
// contado. Se usa donde solo hace falta "algo" para mostrar una vista previa.
export function estadoActualDe(orden, conteos) {
  return estadosActualesDe(orden, conteos)[0] || null;
}

// Una posicion esta "revisada" en el turno actual si alguno de sus registros
// quedo guardado dentro del turno que esta corriendo (6-2, 2-10 o 10-6; el
// 10-6 de madrugada cuenta para el dia en que empezo). El parametro `turno`
// se conserva por compatibilidad: el turno ya se calcula solo por la hora.
// eslint-disable-next-line no-unused-vars
export function esRevisadaHoy(orden, conteos, turno) {
  return estadosActualesDe(orden, conteos).some((c) => esDelTurnoActual(c));
}

// Cuanto dura un bloqueo de edicion antes de considerarse abandonado (por
// ejemplo si el Rotador cerro la app sin guardar ni cancelar).
const BLOQUEO_TTL_MS = 5 * 60 * 1000;

export function bloqueoVigente(bloqueo) {
  if (!bloqueo) return false;
  return Date.now() - new Date(bloqueo.CreadoEn).getTime() < BLOQUEO_TTL_MS;
}

// El bloqueo vigente de una posicion (por Orden), o null si no hay ninguno
// o si el que habia ya expiro.
export function bloqueoDe(orden, bloqueos) {
  const b = bloqueos.find((x) => x.Orden === orden);
  return bloqueoVigente(b) ? b : null;
}
