// Regenera la lista de posiciones (Modulos, embebida en el codigo) y la
// tabla "conteos" de Supabase, ambas derivadas de la hoja "Conteos" del
// Excel real de la planta (Seg Rotacion OK.xlsm) — esa hoja es la UNICA
// fuente: no existe una hoja "Modulos" aparte, el orden de las filas de
// "Conteos" ES el "Orden" de cada posicion.
//
// Se usa cuando el layout fisico de la bodega cambio desde la ultima carga
// (posiciones nuevas, movidas o eliminadas) — no basta con actualizar
// Supabase porque el "Orden" ya no significaria lo mismo para las
// posiciones que se movieron.
//
// Uso:
//   SUPABASE_URL=... SUPABASE_ANON_KEY=... \
//   node scripts/actualizar-desde-excel.mjs "/ruta/al/Seg Rotacion OK.xlsm" [--dry-run]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';

// --- misma logica de src/logica/macro.js y src/utilidades/fechas.js,
// copiada aqui a proposito: ese archivo usa imports sin extension (validos
// para Vite/el bundler de la app, no para el loader ESM nativo de Node), asi
// que este script de mantenimiento se deja autocontenido en vez de depender
// de un bundler. Si cambia la formula de negocio, actualizar ambos lados.
function diasEntre(desde, hasta) {
  const a = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
  const b = new Date(hasta.getFullYear(), hasta.getMonth(), hasta.getDate());
  return Math.round((b - a) / 86400000);
}
function parsearFechaLocal(fechaISO) {
  if (!fechaISO) return null;
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}
function redondear(n, decimales) {
  const f = 10 ** decimales;
  return Math.round(n * f) / f;
}
function calcularEstado(dias) {
  if (dias < 0) return 'Vencido';
  if (dias < 10) return 'Menos de 10 días';
  if (dias < 30) return 'Menos de 30 días';
  if (dias < 60) return 'Menos de 60 días';
  if (dias < 90) return 'Menos de 90 días';
  if (dias < 120) return 'Menos de 120 días';
  return 'Mayor a 120 días';
}
function estaBloqueado(conteo) {
  return conteo.Bloquear === 'Bloquear';
}
function calcularIndicadores(conteo, sku, hoy = new Date()) {
  const fechaVencimiento = parsearFechaLocal(conteo.FechaVencimiento);
  if (!sku || !fechaVencimiento) return null;
  const diasParaVencer = diasEntre(hoy, fechaVencimiento);
  const estado = calcularEstado(diasParaVencer);
  const bloqueado = estaBloqueado(conteo);
  const frescura = bloqueado ? null : redondear(diasParaVencer / sku.VidaUtil, 2);
  const aptoT1 = !bloqueado && diasParaVencer >= sku.MinimoT1 ? 'Sí' : 'No';
  const aptoT2 = !bloqueado && diasParaVencer >= sku.MinimoT2 ? 'Sí' : 'No';
  const aptoKA = !bloqueado && diasParaVencer > sku.MinimoKA ? 'Sí' : 'No';
  const totalCajas = (Number(conteo.Cajas) || 0) + (Number(conteo.Estibas) || 0) * sku.CajXEstiba;
  const totalUnidades = bloqueado ? null : (Number(conteo.Unidades) || 0) + totalCajas * sku.FactorCajas;
  const hectolitros = bloqueado ? 0 : redondear((totalUnidades * sku.Contenido) / 100000, 1);
  return { diasParaVencer: bloqueado ? null : diasParaVencer, estado, frescura, aptoT1, aptoT2, aptoKA, totalCajas, totalUnidades, hectolitros, bloqueado };
}
function ordenarComoLaMacro(items) {
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
function calcularResultadoMacro(conteos, skus) {
  const base = conteos.map((c) => {
    const sku = skus.find((s) => s.Codigo === c.Codigo) || null;
    return { ...c, _sku: sku, _calc: calcularIndicadores(c, sku) };
  });
  return ordenarComoLaMacro(base.map((c) => ({ familia: c._sku?.Familia || '', codigo: c.Codigo, dias: c._calc?.diasParaVencer, c }))).map((item, i) => ({
    ...item.c,
    ordenMacro: i + 1,
  }));
}

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const rutaExcel = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!rutaExcel) {
  console.error('Uso: node scripts/actualizar-desde-excel.mjs "/ruta/al/Seg Rotacion OK.xlsm" [--dry-run]');
  process.exit(1);
}

// ---------- 1) Leer la hoja Conteos ----------
const wb = XLSX.readFile(rutaExcel, { cellDates: true });
const ws = wb.Sheets['Conteos'];
if (!ws) {
  console.error('No se encontro la hoja "Conteos" en ese archivo.');
  process.exit(1);
}
const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: true });

// Fila 7 (0-based) trae los encabezados reales de la tabla; los datos
// empiezan en la fila 8. Antes de eso hay celdas sueltas del formato
// ("Formato de Conteo de Producto", "Fecha Toma", etc.), no una tabla.
const HEADER_ROW = 7;
const DATA_START = HEADER_ROW + 1;
const dataRows = raw.slice(DATA_START).filter((r) => r[0] !== null && r[0] !== undefined && String(r[0]).trim() !== '');

const COL = {
  modulo: 0,
  codigo: 1,
  estibas: 3,
  cajas: 4,
  unidades: 5,
  fechaVencimiento: 6,
  estatus: 11,
  bloquear: 25,
  bodega: 30,
  fase: 31,
};

// "Fecha Toma" del formato (fila 3, columna C = indice 2) — misma fecha de
// referencia para todas las filas de esta carga.
const fechaTomaCelda = raw[3]?.[2];
const fechaToma = fechaTomaCelda instanceof Date ? fechaTomaCelda : new Date();

function aFechaISO(valor) {
  if (!(valor instanceof Date) || Number.isNaN(valor.getTime())) return '';
  return valor.toISOString().slice(0, 10);
}

// ---------- 2) Regenerar Modulos (Orden = orden de fila en este archivo) ----------
const nuevosModulos = dataRows.map((row, i) => ({
  Modulo: String(row[COL.modulo]).trim(),
  Bodega: row[COL.bodega] ? String(row[COL.bodega]).trim() : '',
  Fase: row[COL.fase] ? String(row[COL.fase]).trim() : '',
  Orden: i + 1,
  Activo: 'Si',
}));

// ---------- 3) Regenerar Conteos (mismo Orden que Modulos) ----------
const USUARIO_CARGA = 'carga.actualizada@rotadores.local';
const nuevosConteos = dataRows.map((row, i) => ({
  Orden: i + 1,
  Modulo: String(row[COL.modulo]).trim(),
  Codigo: row[COL.codigo] === null ? '' : String(row[COL.codigo]).trim(),
  Estibas: Number(row[COL.estibas]) || 0,
  Cajas: Number(row[COL.cajas]) || 0,
  Unidades: Number(row[COL.unidades]) || 0,
  FechaVencimiento: aFechaISO(row[COL.fechaVencimiento]),
  Estatus: row[COL.estatus] ? String(row[COL.estatus]).trim() : '',
  Observaciones: '',
  Bloquear: row[COL.bloquear] === 'Bloquear' ? 'Bloquear' : 'No',
  Usuario: USUARIO_CARGA,
  Rol: 'Rotador',
  Turno: '',
  FechaToma: fechaToma.toISOString(),
  Sede: 'Tocancipá',
}));

// ---------- 4) Verificar Codigos contra el maestro de Skus embebido ----------
const contenidoSkus = readFileSync(join(raiz, 'src/datos/skusDemo.js'), 'utf-8');
const skus = eval(contenidoSkus.match(/export const SKUS_DEMO\s*=\s*(\[[\s\S]*\]);/)[1]);
const codigosSkus = new Set(skus.map((s) => s.Codigo));
const codigosFaltantes = [...new Set(nuevosConteos.filter((c) => c.Codigo && !codigosSkus.has(c.Codigo)).map((c) => c.Codigo))];

// ---------- 5) Resumen ----------
console.log(`Filas leidas de "Conteos": ${dataRows.length}`);
console.log(`Posiciones (Modulos) que quedaran: ${nuevosModulos.length}`);
console.log(`Codigos de producto sin match en el maestro de Skus (${codigosFaltantes.length}):`, codigosFaltantes.slice(0, 30));
console.log(`Fecha Toma usada para todas las filas: ${fechaToma.toISOString()}`);

if (dryRun) {
  console.log('\n--dry-run: no se escribio nada en disco ni en Supabase.');
  process.exit(0);
}

// ---------- 6) Sobrescribir src/datos/modulosDemo.js ----------
const encabezadoModulos = `// Posiciones fisicas de bodega (Orden/Modulo/Bodega/Fase), embebidas porque
// son datos maestros que casi no cambian. Regenerado desde la hoja "Conteos"
// del Excel real (no existe una hoja "Modulos" aparte: el orden de fila de
// "Conteos" ES el "Orden" de cada posicion) via scripts/actualizar-desde-excel.mjs.
// Ultima actualizacion: ${new Date().toISOString().slice(0, 10)}.
export const MODULOS_DEMO = ${JSON.stringify(nuevosModulos, null, 2)};
`;
writeFileSync(join(raiz, 'src/datos/modulosDemo.js'), encabezadoModulos);
console.log('src/datos/modulosDemo.js actualizado.');

// ---------- 7) Subir a Supabase: reemplazar conteos por completo ----------
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Falta SUPABASE_URL y/o SUPABASE_ANON_KEY en el entorno — no se subio nada a Supabase.');
  process.exit(1);
}
const supabase = createClient(url, key);

async function reemplazarTabla(tabla, filas) {
  const { error: errDel } = await supabase.from(tabla).delete().not('id', 'is', null);
  if (errDel) throw errDel;
  const tamano = 300;
  for (let i = 0; i < filas.length; i += tamano) {
    const lote = filas.slice(i, i + tamano);
    const { error } = await supabase.from(tabla).insert(lote);
    if (error) throw error;
  }
}

await reemplazarTabla('conteos', nuevosConteos);
console.log(`Supabase: tabla "conteos" reemplazada con ${nuevosConteos.length} filas.`);

// Recalcula "resultado_macro" (mismo cruce Conteos+Skus que usa la app en
// vivo) para que quede consultable directo desde el Table Editor sin abrir
// la app, igual que hace la app cada vez que algo cambia.
const resultado = calcularResultadoMacro(nuevosConteos, skus).map((f) => ({
  id: `${f.Orden}-macro`,
  OrdenMacro: f.ordenMacro,
  Orden: f.Orden,
  Modulo: f.Modulo,
  Familia: f._sku?.Familia || '',
  Codigo: f.Codigo,
  Descripcion: f._sku?.Descripcion || '',
  Estibas: f.Estibas,
  Cajas: f.Cajas,
  Unidades: f.Unidades,
  FechaVencimiento: f.FechaVencimiento,
  DiasParaVencer: f._calc?.diasParaVencer ?? null,
  Estado: f._calc?.estado ?? null,
  Frescura: f._calc?.frescura ?? null,
  AptoT1: f._calc?.aptoT1 ?? null,
  AptoT2: f._calc?.aptoT2 ?? null,
  AptoKA: f._calc?.aptoKA ?? null,
  TotalCajas: f._calc?.totalCajas ?? null,
  TotalUnidades: f._calc?.totalUnidades ?? null,
  Hectolitros: f._calc?.hectolitros ?? null,
  Estatus: f.Estatus,
  Observaciones: f.Observaciones,
  Usuario: f.Usuario,
}));
await reemplazarTabla('resultado_macro', resultado);
console.log(`Supabase: tabla "resultado_macro" recalculada con ${resultado.length} filas.`);

console.log('\nListo. El Historial NO se toco (log de capturas reales, no se pisa con esta carga).');
