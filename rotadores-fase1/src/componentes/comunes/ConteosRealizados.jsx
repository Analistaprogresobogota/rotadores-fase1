import { useEffect, useMemo, useState } from 'react';
import { useDatos } from '../../hooks/useDatos';
import { descargarExcel } from '../../utilidades/exportarExcel';
import { filasRevisadas } from '../../utilidades/filasExcel';
import { turnoActual, HORARIO_TURNO, esDelTurnoActual } from '../../utilidades/turnos';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { SectionTitle } from './SectionTitle';
import { Cargando } from './Cargando';
import { ErrorAviso } from './ErrorAviso';
import { Empty } from './Empty';

// Solo las posiciones revisadas en el turno que está corriendo (6-2, 2-10 o
// 10-6), con quién las revisó y a qué hora. Se descarga en Excel.
export function ConteosRealizados() {
  const { cargando, error, obtenerSkus, obtenerConteos } = useDatos();
  const [skus, setSkus] = useState([]);
  const [conteos, setConteos] = useState([]);
  const [, setReloj] = useState(0);

  useEffect(() => {
    obtenerSkus().then(setSkus).catch(() => {});
    obtenerConteos().then(setConteos).catch(() => {});
    const id = setInterval(() => setReloj((n) => n + 1), 60000); // si cambia el turno, se recalcula
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = turnoActual();
  const realizados = useMemo(() => conteos.filter((c) => esDelTurnoActual(c)).sort((a, b) => String(b.FechaToma).localeCompare(String(a.FechaToma))), [conteos, t.dia, t.nombre]); // eslint-disable-line react-hooks/exhaustive-deps
  const filas = useMemo(() => filasRevisadas(realizados, skus), [realizados, skus]);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <SectionTitle icono="✅" titulo="Conteos realizados" sub="Solo las posiciones revisadas en el turno actual." />
      <div className="turno-banda">
        <div>
          <span className="turno-chip">Turno {t.nombre}</span>
          <span className="texto-sub">{HORARIO_TURNO[t.nombre]} · día {formatoFechaLegible(t.dia)}</span>
        </div>
        <div className="turno-avance"><b>{realizados.length}</b> registro(s) revisados en este turno</div>
      </div>
      <ErrorAviso mensaje={error} />
      {cargando && conteos.length === 0 && <Cargando texto="Cargando conteos…" />}
      <button className="boton-secundario boton-descarga" disabled={!filas.length} onClick={() => descargarExcel(`conteos-realizados-turno-${t.nombre}-${t.dia}`, filas)}>
        ⬇ Descargar conteos realizados en Excel ({filas.length})
      </button>
      {!cargando && filas.length === 0 ? (
        <Empty texto="Todavía no se ha revisado ninguna posición en este turno." />
      ) : (
        <div className="tabla-envoltorio" style={{ maxHeight: 560, overflowY: 'auto' }}>
          <table className="tabla">
            <thead>
              <tr>{filas[0] && Object.keys(filas[0]).map((k) => <th key={k}>{k}</th>)}</tr>
            </thead>
            <tbody>
              {filas.map((f, i) => (
                <tr key={realizados[i].id || i}>{Object.values(f).map((v, j) => <td key={j}>{String(v ?? '')}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
