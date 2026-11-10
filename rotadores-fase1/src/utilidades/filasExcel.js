import { calcularIndicadores } from '../logica/macro';
import { formatoFechaLegible } from './fechas';
import { turnoDe } from './turnos';

// Mismas 11 columnas y orden de la hoja "Conteos" del Excel real.
export function filasConteos(conteos, skus) {
  return conteos.map((f) => {
    const sku = skus.find((s) => s.Codigo === f.Codigo) || null;
    const calc = calcularIndicadores(f, sku);
    return {
      Modulo: f.Modulo,
      Código: f.Codigo,
      Descripción: sku?.Descripcion || '',
      Estibas: f.Estibas,
      Cajas: f.Cajas,
      Unidades: f.Unidades,
      'Fecha de vencimiento': f.FechaVencimiento ? formatoFechaLegible(f.FechaVencimiento) : '',
      'Días para vencer': calc?.diasParaVencer ?? '',
      Observaciones: f.Observaciones || '',
      Estatus: f.Estatus || '',
      'Total Cajas': calc?.totalCajas ?? '',
    };
  });
}

// Posiciones revisadas: lo mismo de Conteos + quién, cuándo y en qué turno.
export function filasRevisadas(conteos, skus) {
  return filasConteos(conteos, skus).map((fila, i) => {
    const c = conteos[i];
    const t = c.FechaToma ? turnoDe(c.FechaToma) : null;
    return {
      ...fila,
      Usuario: c.Usuario || '',
      Turno: t ? t.nombre : c.Turno || '',
      'Día del turno': t ? formatoFechaLegible(t.dia) : '',
      'Fecha y hora de toma': c.FechaToma ? new Date(c.FechaToma).toLocaleString('es-CO') : '',
    };
  });
}
