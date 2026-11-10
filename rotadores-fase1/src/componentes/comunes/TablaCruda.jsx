import { calcularIndicadores } from '../../logica/macro';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { Empty } from './Empty';

// Columnas base, iguales a la hoja "Conteos" del Excel real (el subconjunto
// que el Programador puede pegar ahi tal cual): Modulo, Código, Descripción,
// Estibas, Cajas, Unidades, Fecha de vencimiento, Días para vencer,
// Observaciones, Estatus, Total Cajas.
//
// columnasCompletas=true (por defecto, usado por Historial) agrega ademas
// Bloquear y los datos de sesion (Usuario/Rol/Turno/Fecha de toma/Sede) —
// necesarios para el dashboard y la trazabilidad, pero que NO deben salir
// en la tabla/Excel de Conteos (esa se reemplaza directo en el Excel real,
// tiene que quedar identica a sus columnas).
export function TablaCruda({ filas, skus, columnasCompletas = true }) {
  if (filas.length === 0) return <Empty texto="No hay registros." />;
  return (
    <div className="tabla-envoltorio" style={{ maxHeight: 360, overflowY: 'auto' }}>
      <table className="tabla">
        <thead>
          <tr>
            <th>Modulo</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Estibas</th>
            <th>Cajas</th>
            <th>Unidades</th>
            <th>Fecha de vencimiento</th>
            <th>Días para vencer</th>
            <th>Observaciones</th>
            <th>Estatus</th>
            <th>Total Cajas</th>
            {columnasCompletas && (
              <>
                <th>Bloquear</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Turno</th>
                <th>Fecha de toma</th>
                <th>Sede</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => {
            const sku = skus.find((s) => s.Codigo === f.Codigo) || null;
            const calc = calcularIndicadores(f, sku);
            return (
              <tr key={f.id}>
                <td>{f.Modulo}</td>
                <td>{f.Codigo}</td>
                <td className="texto-sub">{sku?.Descripcion || '—'}</td>
                <td>{f.Estibas}</td>
                <td>{f.Cajas}</td>
                <td>{f.Unidades}</td>
                <td>{f.FechaVencimiento ? formatoFechaLegible(f.FechaVencimiento) : '—'}</td>
                <td>{calc?.diasParaVencer ?? '—'}</td>
                <td className="texto-sub">{f.Observaciones || '—'}</td>
                <td>{f.Estatus || '—'}</td>
                <td>{calc?.totalCajas ?? '—'}</td>
                {columnasCompletas && (
                  <>
                    <td style={{ color: f.Bloquear === 'Bloquear' ? 'var(--bad)' : undefined, fontWeight: f.Bloquear === 'Bloquear' ? 700 : undefined }}>
                      {f.Bloquear === 'Bloquear' ? 'Bloqueado' : 'No'}
                    </td>
                    <td className="texto-sub">{f.Usuario}</td>
                    <td className="texto-sub">{f.Rol}</td>
                    <td className="texto-sub">{f.Turno || '—'}</td>
                    <td className="texto-sub">{f.FechaToma ? new Date(f.FechaToma).toLocaleString('es-CO') : '—'}</td>
                    <td className="texto-sub">{f.Sede}</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
