import * as XLSX from 'xlsx';

// Lee un Excel con EXACTAMENTE las mismas columnas que produce
// descargarExcel() para Conteos (Modulo, Código, Estibas, Cajas, Unidades,
// Fecha de vencimiento, Observaciones, Estatus) — a proposito, para no
// depender del Excel real completo (pesado, muchas hojas, columnas que no
// aplican). Descripcion, Dias para vencer y Total Cajas se ignoran si
// vienen: son columnas calculadas, no se importan.
function fechaDesdeCelda(valor) {
  if (!valor) return '';
  if (valor instanceof Date) {
    const y = valor.getFullYear();
    const m = String(valor.getMonth() + 1).padStart(2, '0');
    const d = String(valor.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const texto = String(valor).trim();
  const conBarras = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); // dd/mm/aaaa, formato de la descarga
  if (conBarras) {
    const [, dia, mes, anio] = conBarras;
    return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) return texto; // ya viene en ISO
  return '';
}

export function leerExcelConteos(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = (evento) => {
      try {
        const libro = XLSX.read(evento.target.result, { type: 'array', cellDates: true });
        const hoja = libro.Sheets[libro.SheetNames[0]];
        const filasCrudas = XLSX.utils.sheet_to_json(hoja, { defval: '' });
        const filas = filasCrudas
          .map((f) => ({
            Modulo: String(f.Modulo || '').trim(),
            Codigo: String(f['Código'] ?? f.Codigo ?? '').trim(),
            Estibas: Number(f.Estibas) || 0,
            Cajas: Number(f.Cajas) || 0,
            Unidades: Number(f.Unidades) || 0,
            FechaVencimiento: fechaDesdeCelda(f['Fecha de vencimiento'] ?? f.FechaVencimiento),
            Estatus: String(f.Estatus || '').trim(),
            Observaciones: String(f.Observaciones || '').trim(),
          }))
          .filter((f) => f.Modulo);
        resolve(filas);
      } catch {
        reject(new Error('No se pudo leer el archivo — verifica que sea el mismo formato que descarga la app.'));
      }
    };
    lector.onerror = () => reject(new Error('No se pudo abrir el archivo.'));
    lector.readAsArrayBuffer(archivo);
  });
}
