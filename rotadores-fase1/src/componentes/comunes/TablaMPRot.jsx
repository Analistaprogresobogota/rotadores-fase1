import { formatoFechaLegible } from '../../utilidades/fechas';
import { Empty } from './Empty';

// Mismas columnas que la hoja "MPRot" (Modulos en Rotacion) del Excel real:
// Orden, Modulo, Familia, Código, Descripción, Estibas, Cajas, Fecha de
// vencimiento. Es la vista que reemplaza esa hoja para el Rotador/Admin —
// solo para consultar en pantalla, no tiene boton de descargar Excel (esa
// hoja del Excel real no se reemplaza con esto, solo se deja de necesitar).
// El calculo y el orden (ordenMacro) vienen ya listos de
// calcularResultadoMacro en logica/macro.js — no cambian aqui.
export function TablaMPRot({ conteos }) {
  if (conteos.length === 0) return <Empty texto="No hay conteos todavía." />;
  return (
    <div className="tabla-envoltorio">
      <table className="tabla">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Módulo</th>
            <th>Familia</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Estibas</th>
            <th>Cajas</th>
            <th>Fecha de vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {conteos.map((c) => (
            <tr key={c.id}>
              <td>{c.ordenMacro}</td>
              <td>{c.Modulo}</td>
              <td className="texto-sub">{c._sku?.Familia || '—'}</td>
              <td>{c.Codigo}</td>
              <td className="texto-sub" style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c._sku?.Descripcion || 'Código no está en el maestro'}
              </td>
              <td>{c.Estibas}</td>
              <td>{c.Cajas}</td>
              <td>{formatoFechaLegible(c.FechaVencimiento)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
