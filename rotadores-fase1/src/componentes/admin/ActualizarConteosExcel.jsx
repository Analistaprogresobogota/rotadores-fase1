import { useState } from 'react';
import { useSession } from '../../contexto/useSession';
import { useDatos } from '../../hooks/useDatos';
import { CONFIG } from '../../config';
import { formatoISODatetime } from '../../utilidades/fechas';
import { leerExcelConteos } from '../../utilidades/importarConteos';
import { SectionTitle } from '../comunes/SectionTitle';

// Sincroniza Conteos desde un Excel con las mismas columnas que produce
// "Descargar Excel" (no el Excel real completo, pesado y con hojas que no
// aplican) — pensado para retomar la informacion mas actualizada si el
// aplicativo dejo de usarse un tiempo.
//
// Por cada Modulo que SI existe en el catalogo (MODULOS_DEMO): las filas
// del Excel para ese modulo reemplazan por completo lo que hay guardado
// ahi (se actualiza lo que coincide por Codigo, se crea lo nuevo, y se
// borra lo que ya no viene en el Excel) — asi funciona bien tanto para
// posiciones normales como mixtas (2+ productos), sin dejar registros
// huerfanos.
//
// Los Modulo que NO existen en el catalogo se listan aparte: eso significa
// que el layout fisico de la bodega cambio de verdad, y ese caso si
// requiere actualizar el catalogo por codigo (no se puede resolver solo
// subiendo un Excel), ver scripts/actualizar-desde-excel.mjs.
export function ActualizarConteosExcel() {
  const { usuario } = useSession();
  const { obtenerModulos, obtenerConteos, guardarConteo, eliminarConteo, crearHistorial } = useDatos();
  const [procesando, setProcesando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  async function subirArchivo(e) {
    const archivo = e.target.files?.[0];
    e.target.value = '';
    if (!archivo) return;

    setProcesando(true);
    setError(null);
    setResultado(null);
    try {
      const filasExcel = await leerExcelConteos(archivo);
      const [modulos, conteosActuales] = await Promise.all([obtenerModulos(), obtenerConteos()]);

      const ordenPorModulo = new Map();
      modulos.forEach((m) => {
        if (!ordenPorModulo.has(m.Modulo)) ordenPorModulo.set(m.Modulo, m.Orden);
      });

      const porModulo = new Map();
      const sinCoincidencia = [];
      filasExcel.forEach((f) => {
        const orden = ordenPorModulo.get(f.Modulo);
        if (orden === undefined) {
          sinCoincidencia.push(f.Modulo);
          return;
        }
        if (!porModulo.has(orden)) porModulo.set(orden, []);
        porModulo.get(orden).push(f);
      });

      let actualizados = 0;
      let creados = 0;
      let borrados = 0;

      for (const [orden, filasDelModulo] of porModulo) {
        const existentes = conteosActuales.filter((c) => c.Orden === orden);
        const existentesPorCodigo = new Map(existentes.map((c) => [c.Codigo, c]));
        const codigosEnExcel = new Set(filasDelModulo.map((f) => f.Codigo));

        // Borra lo que ya no viene en el Excel para esta posicion.
        for (const c of existentes) {
          if (!codigosEnExcel.has(c.Codigo)) {
            await eliminarConteo(c.id);
            borrados += 1;
          }
        }

        // Actualiza o crea cada fila del Excel para esta posicion.
        for (const f of filasDelModulo) {
          const existente = existentesPorCodigo.get(f.Codigo);
          const datos = {
            Modulo: f.Modulo,
            Orden: orden,
            Codigo: f.Codigo,
            Estibas: f.Estibas,
            Cajas: f.Cajas,
            Unidades: f.Unidades,
            FechaVencimiento: f.FechaVencimiento,
            Estatus: f.Estatus,
            Observaciones: f.Observaciones,
            Bloquear: 'No',
            Usuario: usuario,
            Rol: 'Admin',
            Turno: '',
            FechaToma: formatoISODatetime(new Date()),
            Sede: CONFIG.sede,
          };
          await guardarConteo(datos, existente?.id);
          await crearHistorial(datos);
          if (existente) actualizados += 1;
          else creados += 1;
        }
      }

      setResultado({
        posiciones: porModulo.size,
        actualizados,
        creados,
        borrados,
        sinCoincidencia: [...new Set(sinCoincidencia)],
      });
    } catch (err) {
      setError(err.message || 'No se pudo procesar el archivo.');
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="panel" style={{ display: 'grid', gap: 12 }}>
      <SectionTitle
        icono="🔄"
        titulo="Actualizar Conteos desde Excel"
        sub="Sube un Excel con las mismas columnas que produce “Descargar Excel” en Conteos — no el Excel real completo."
      />

      <label className="boton-secundario" style={{ justifySelf: 'start', cursor: procesando ? 'default' : 'pointer' }}>
        {procesando ? 'Procesando…' : '📤 Subir Excel de Conteos'}
        <input type="file" accept=".xlsx,.xls" onChange={subirArchivo} disabled={procesando} style={{ display: 'none' }} />
      </label>

      {error && (
        <div className="texto-sub" style={{ color: 'var(--error)' }}>
          {error}
        </div>
      )}

      {resultado && (
        <div style={{ display: 'grid', gap: 6, fontSize: 13 }}>
          <div>
            ✅ {resultado.posiciones} posiciones procesadas — {resultado.actualizados} actualizadas, {resultado.creados} creadas,{' '}
            {resultado.borrados} borradas (ya no venían en el Excel).
          </div>
          {resultado.sinCoincidencia.length > 0 && (
            <div style={{ color: 'var(--warn)' }}>
              ⚠ {resultado.sinCoincidencia.length} módulo(s) del Excel no existen en el catálogo actual — el layout de
              bodega pudo haber cambiado, esto requiere actualizar el catálogo con código, no se resuelve solo con este
              botón: {resultado.sinCoincidencia.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
