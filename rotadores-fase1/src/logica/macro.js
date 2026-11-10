// Logica de negocio ("la macro" de Excel), calculada EN VIVO.
// Cruza un registro de la lista Conteos con su Sku maestro (por Codigo).
// Nada de esto se guarda en SharePoint: depende de la fecha de hoy, asi
// que se recalcula cada vez que se lee un conteo.
import { diasEntre, parsearFechaLocal } from '../utilidades/fechas';
import { redondear } from '../utilidades/formato';

// Orden fijo de rangos de vencimiento, usado por el indice de frescura del supervisor.
export const ORDEN_ESTADOS = [
  'Vencido',
  'Menos de 10 días',
  'Menos de 30 días',
  'Menos de 60 días',
  'Menos de 90 días',
  'Menos de 120 días',
  'Mayor a 120 días',
];

export const COLOR_ESTADO = {
  Vencido: '--bad',
  'Menos de 10 días': '--bad',
  'Menos de 30 días': '--warn',
  'Menos de 60 días': '--warn',
  'Menos de 90 días': '--accent2',
  'Menos de 120 días': '--accent2',
  'Mayor a 120 días': '--ok',
};

function calcularEstado(dias) {
  if (dias < 0) return 'Vencido';
  if (dias < 10) return 'Menos de 10 días';
  if (dias < 30) return 'Menos de 30 días';
  if (dias < 60) return 'Menos de 60 días';
  if (dias < 90) return 'Menos de 90 días';
  if (dias < 120) return 'Menos de 120 días';
  return 'Mayor a 120 días';
}

// Un producto "Bloqueado" (columna Bloquear = "Bloquear", distinta de
// Estatus) queda retenido: la macro deja de calcularle frescura/unidades y
// fuerza los APTO en "No", aunque el Estado y el Total de cajas si se
// siguen mostrando con normalidad. Confirmado comparando fila por fila
// contra el Excel real (ver hoja Conteos, columna Bloquear).
function estaBloqueado(conteo) {
  return conteo.Bloquear === 'Bloquear';
}

/**
 * @param {object} conteo fila de Conteos: { Codigo, Estibas, Cajas, Unidades, FechaVencimiento, Bloquear }
 * @param {object|null} sku fila de Skus para ese Codigo, o null si no esta en el maestro
 * @param {Date} [hoy] inyectable para pruebas; por defecto la fecha actual
 * @returns {object|null} indicadores calculados, o null si no hay sku o no hay fecha
 */
export function calcularIndicadores(conteo, sku, hoy = new Date()) {
  const fechaVencimiento = parsearFechaLocal(conteo.FechaVencimiento);
  if (!sku || !fechaVencimiento) return null;

  const diasParaVencer = diasEntre(hoy, fechaVencimiento);
  const estado = calcularEstado(diasParaVencer);
  const bloqueado = estaBloqueado(conteo);

  const frescura = bloqueado ? null : redondear(diasParaVencer / sku.VidaUtil, 2);
  const aptoT1 = !bloqueado && diasParaVencer >= sku.MinimoT1 ? 'Sí' : 'No';
  const aptoT2 = !bloqueado && diasParaVencer >= sku.MinimoT2 ? 'Sí' : 'No';
  const aptoKA = !bloqueado && diasParaVencer > sku.MinimoKA ? 'Sí' : 'No';

  // Cajas sueltas + cajas completas por estiba
  const totalCajas = (Number(conteo.Cajas) || 0) + (Number(conteo.Estibas) || 0) * sku.CajXEstiba;
  // Unidades sueltas + unidades contenidas en el total de cajas
  const totalUnidades = bloqueado ? null : (Number(conteo.Unidades) || 0) + totalCajas * sku.FactorCajas;
  const hectolitros = bloqueado ? 0 : redondear((totalUnidades * sku.Contenido) / 100000, 1);

  return {
    diasParaVencer: bloqueado ? null : diasParaVencer,
    estado,
    frescura,
    aptoT1,
    aptoT2,
    aptoKA,
    totalCajas,
    totalUnidades,
    hectolitros,
    bloqueado,
  };
}

// El "Orden" que muestra la macro al correrla en Excel (hoja MPRot) NO es
// la posicion fisica del modulo en la bodega: agrupa todos los conteos del
// MISMO producto (Codigo) uno junto al otro, y dentro de cada producto los
// ordena del que vence primero al que vence de ultimo. Recibe items ya con
// { familia, codigo, dias } sueltos (el llamador se encarga de mapear su
// propia forma de datos) y devuelve la MISMA lista reordenada.
//
// El Codigo se ordena como TEXTO (no numerico): en el Excel real la columna
// Codigo es texto, asi que "13766" queda antes que "1428" (compara caracter
// por caracter, no por valor numerico). Confirmado comparando contra el
// orden real de la hoja MPRot — un orden numerico de Codigo produce una
// secuencia distinta a la de Excel.
export function ordenarComoLaMacro(items) {
  return [...items].sort((a, b) => {
    if (a.familia !== b.familia) return a.familia.localeCompare(b.familia);
    const codigoA = String(a.codigo);
    const codigoB = String(b.codigo);
    if (codigoA !== codigoB) return codigoA < codigoB ? -1 : 1;
    const diasA = a.dias ?? Infinity;
    const diasB = b.dias ?? Infinity;
    return diasA - diasB;
  });
}

// Cruza Conteos con Skus y aplica el orden de la macro de una sola vez.
// Usado tanto por el tablero del Supervisor como por las vistas en vivo del
// Rotador (BuscadorPosiciones) — mismo calculo, mismo orden, en un solo lugar.
export function calcularResultadoMacro(conteos, skus) {
  const base = conteos.map((c) => {
    const sku = skus.find((s) => s.Codigo === c.Codigo) || null;
    return { ...c, _sku: sku, _calc: calcularIndicadores(c, sku) };
  });
  return ordenarComoLaMacro(
    base.map((c) => ({ familia: c._sku?.Familia || '', codigo: c.Codigo, dias: c._calc?.diasParaVencer, c }))
  ).map((item, i) => ({ ...item.c, ordenMacro: i + 1 }));
}
