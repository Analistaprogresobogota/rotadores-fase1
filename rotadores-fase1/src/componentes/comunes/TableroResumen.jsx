import { useEffect, useMemo, useState } from 'react';
import { useDatos } from '../../hooks/useDatos';
import { calcularResultadoMacro } from '../../logica/macro';
import { modulosActivosOrdenados } from '../../logica/modulos';
import { TURNOS, HORARIO_TURNO, turnoDe, turnoActual } from '../../utilidades/turnos';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { Cargando } from './Cargando';
import { ErrorAviso } from './ErrorAviso';
import { Empty } from './Empty';

function formatoHora(fechaISO) {
  if (!fechaISO) return '—';
  return new Date(fechaISO).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}
const pct = (a, b) => (b ? (a / b) * 100 : 0);
const fmt = (n) => Number(n || 0).toLocaleString('es-CO');

/* Medidor circular (mismo estilo del tablero de Trazza) */
export function Medidor({ valor }) {
  const r = 24, c = 2 * Math.PI * r, v = Math.max(0, Math.min(100, valor));
  return (
    <svg className="medidor-circ" width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
      <circle className="pista" cx="30" cy="30" r={r} fill="none" strokeWidth="7" />
      <circle className="valor" cx="30" cy="30" r={r} fill="none" strokeWidth="7" strokeDasharray={`${(c * v) / 100} ${c}`} transform="rotate(-90 30 30)" />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{Math.round(v)}%</text>
    </svg>
  );
}

export function Kpi({ etiqueta, valor, unidad, pie, estado, viz }) {
  return (
    <div className={`kpi-im ${estado || ''}`}>
      <span className="kpi-im-etq">{etiqueta}</span>
      <div className="kpi-im-fila">
        <span className="kpi-im-valor">{valor}{unidad && <small>{unidad}</small>}</span>
        {viz}
      </div>
      {pie && <span className="kpi-im-pie">{pie}</span>}
    </div>
  );
}

export function Panel({ titulo, sub, children, pie, clase = '' }) {
  return (
    <section className={`panel-im ${clase}`}>
      <div className="panel-im-cab">
        <h2>{titulo}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {children}
      {pie && <div className="panel-im-pie">{pie}</div>}
    </section>
  );
}

// Tablero de monitoreo (Supervisor / Admin): qué hace cada rotador, cuánto
// avanzó cada turno en el día operativo y el estado de Conteos y del Mapa de
// rotación (MPRot). Misma información de antes, con diseño de tablero.
export function TableroResumen() {
  const { cargando, error, obtenerSkus, obtenerConteos, obtenerHistorial, obtenerModulos } = useDatos();
  const [skus, setSkus] = useState([]);
  const [conteos, setConteos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    obtenerSkus().then(setSkus).catch(() => {});
    obtenerConteos().then(setConteos).catch(() => {});
    obtenerHistorial().then(setHistorial).catch(() => {});
    obtenerModulos().then(setModulos).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPosiciones = conteos.length;
  const activas = useMemo(() => modulosActivosOrdenados(modulos).length, [modulos]);
  const conProducto = useMemo(() => conteos.filter((c) => c.Codigo), [conteos]);
  const resultadoMacro = useMemo(() => calcularResultadoMacro(conProducto, skus), [conProducto, skus]);
  const porFamilia = useMemo(() => {
    const m = new Map();
    resultadoMacro.forEach((r) => { const f = r._sku?.Familia || 'Sin familia'; m.set(f, (m.get(f) || 0) + 1); });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [resultadoMacro]);

  // Día operativo: el turno 10-6 de madrugada pertenece al día en que empezó.
  const ahora = turnoActual();
  const delDia = useMemo(() => conteos.filter((c) => c.FechaToma && turnoDe(c.FechaToma).dia === ahora.dia), [conteos, ahora.dia]);
  const rotadoresDia = useMemo(() => [...new Set(delDia.filter((c) => c.Rol === 'Rotador').map((c) => c.Usuario))], [delDia]);
  const porTurno = TURNOS.map((t) => ({ t, n: delDia.filter((c) => turnoDe(c.FechaToma).nombre === t).length }));
  const delTurno = porTurno.find((x) => x.t === ahora.nombre)?.n || 0;
  const maxTurno = Math.max(...porTurno.map((x) => x.n), 1);
  const maxFam = Math.max(...porFamilia.map(([, n]) => n), 1);
  const actividadReciente = historial.slice(0, 15);

  // Desempeño por persona (historial = cada captura con quién, cuándo y turno)
  const porPersona = useMemo(() => {
    const delDiaH = historial.filter((h) => h.FechaToma && turnoDe(h.FechaToma).dia === ahora.dia && h.Rol === 'Rotador');
    const totalDia = new Set(delDiaH.map((h) => h.Orden ?? h.Modulo)).size;
    const m = new Map();
    delDiaH.forEach((h) => {
      const p = m.get(h.Usuario) || { usuario: h.Usuario, pos: new Set(), posTurno: new Set(), capturas: 0, turnos: new Set(), primera: null, ultima: null };
      const k = h.Orden ?? h.Modulo, t = turnoDe(h.FechaToma), f = new Date(h.FechaToma);
      p.pos.add(k); p.capturas++; p.turnos.add(t.nombre);
      if (t.nombre === ahora.nombre) p.posTurno.add(k);
      if (!p.primera || f < p.primera) p.primera = f;
      if (!p.ultima || f > p.ultima) p.ultima = f;
      m.set(h.Usuario, p);
    });
    return [...m.values()].map((p) => {
      const horas = Math.max(0.25, (p.ultima - p.primera) / 36e5);
      return { ...p, posiciones: p.pos.size, enTurno: p.posTurno.size, ritmo: p.pos.size / horas, part: pct(p.pos.size, totalDia) };
    }).sort((a, b) => b.posiciones - a.posiciones);
  }, [historial, ahora.dia, ahora.nombre]);
  const maxPersona = Math.max(...porPersona.map((p) => p.posiciones), 1);
  const horaCorta = (d) => (d ? d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) : '—');

  if (cargando && totalPosiciones === 0) return <Cargando texto="Cargando tablero…" />;

  return (
    <div className="tablero-im">
      <div className="tablero-cab">
        <span className="vivo"><i />EN LÍNEA</span>
        <span className="texto-sub">Día operativo {formatoFechaLegible(ahora.dia)} · turno actual <b>{ahora.nombre}</b> ({HORARIO_TURNO[ahora.nombre]})</span>
      </div>
      <ErrorAviso mensaje={error} />

      {totalPosiciones === 0 ? (
        <Empty texto="No hay conteos todavía. Cuando un rotador capture datos, aquí aparecerán los indicadores." />
      ) : (
        <>
          <div className="kpis-im">
            <Kpi etiqueta="Posiciones contadas" valor={fmt(conProducto.length)} unidad={`/${fmt(totalPosiciones)}`} viz={<Medidor valor={pct(conProducto.length, totalPosiciones)} />} pie="Con producto asignado" />
            <Kpi etiqueta="Revisadas en el turno" valor={fmt(delTurno)} unidad={activas ? `/${fmt(activas)}` : ''} estado={delTurno ? 'verde' : 'amarillo'} viz={<Medidor valor={pct(delTurno, activas)} />} pie={`Turno ${ahora.nombre}`} />
            <Kpi etiqueta="Revisadas hoy" valor={fmt(delDia.length)} pie="Los 3 turnos del día operativo" />
            <Kpi etiqueta="Rotadores activos hoy" valor={rotadoresDia.length} estado={rotadoresDia.length ? 'verde' : ''} pie={rotadoresDia.length ? rotadoresDia.slice(0, 3).join(', ') : 'Nadie ha capturado hoy'} />
            <Kpi etiqueta="Productos en MPRot" valor={fmt(resultadoMacro.length)} pie={`${porFamilia.length} familias`} />
          </div>

          <div className="tablero-grid">
            <Panel titulo="Avance por turno" sub="Posiciones revisadas en cada turno del día operativo" clase="g-6"
              pie={<><span>Total del día: <b>{fmt(delDia.length)}</b></span><span>Turno actual: <b>{ahora.nombre}</b></span></>}>
              <div className="barras-turno">
                {porTurno.map(({ t, n }) => (
                  <div key={t} className={`bt${t === ahora.nombre ? ' actual' : ''}`} title={`Turno ${t}: ${n} posiciones`}>
                    <span className="bt-valor">{fmt(n)}</span>
                    <span className="bt-pista"><span style={{ height: `${Math.max(n ? 4 : 0, (n / maxTurno) * 100)}%` }} /></span>
                    <span className="bt-etq">{t}</span>
                    <span className="bt-sub">{HORARIO_TURNO[t]}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel titulo="Mapa de rotación por familia" sub="Productos en MPRot agrupados por familia" clase="g-6">
              {porFamilia.length === 0 ? (
                <p className="texto-sub">Todavía no hay productos en rotación.</p>
              ) : (
                <div className="barras-h">
                  {porFamilia.slice(0, 8).map(([familia, n]) => (
                    <div key={familia} className="bh" title={`${familia}: ${n}`}>
                      <span className="bh-etq">{familia}</span>
                      <span className="bh-val">{fmt(n)}</span>
                      <span className="bh-pista"><span style={{ width: `${Math.max(2, (n / maxFam) * 100)}%` }} /></span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel titulo="Desempeño por rotador" sub="Posiciones registradas por cada persona en el día operativo" clase="g-12"
              pie={porPersona.length ? <><span>Líder del día: <b>{porPersona[0].usuario}</b> ({fmt(porPersona[0].posiciones)} posiciones)</span><span>Rotadores con registros: <b>{porPersona.length}</b></span></> : null}>
              {porPersona.length === 0 ? (
                <Empty texto="Todavía ningún rotador ha registrado posiciones hoy." />
              ) : (
                <div className="tabla-envoltorio" style={{ maxHeight: 420, overflowY: 'auto' }}>
                  <table className="tabla tabla-limpia tabla-personas">
                    <thead>
                      <tr><th>#</th><th>Rotador</th><th>Posiciones hoy</th><th>Turno {ahora.nombre}</th><th>Ritmo</th><th>Turnos</th><th>Primera · última</th><th>Participación</th></tr>
                    </thead>
                    <tbody>
                      {porPersona.map((p, i) => (
                        <tr key={p.usuario}>
                          <td><span className={`puesto p${i + 1}`}>{i + 1}</span></td>
                          <td><b>{p.usuario}</b><br /><small className="texto-sub">{fmt(p.capturas)} capturas</small></td>
                          <td>
                            <div className="persona-barra">
                              <span className="pb-pista"><span style={{ width: `${Math.max(3, (p.posiciones / maxPersona) * 100)}%` }} /></span>
                              <b>{fmt(p.posiciones)}</b>
                            </div>
                          </td>
                          <td><b>{fmt(p.enTurno)}</b></td>
                          <td>{p.ritmo.toLocaleString('es-CO', { maximumFractionDigits: 1 })} <small className="texto-sub">pos/h</small></td>
                          <td>{[...p.turnos].map((t) => <span key={t} className="turno-chip mini" style={{ marginRight: 4 }}>{t}</span>)}</td>
                          <td className="texto-sub">{horaCorta(p.primera)} · {horaCorta(p.ultima)}</td>
                          <td><b>{Math.round(p.part)}%</b></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>

            <Panel titulo="Actividad reciente" sub="Últimas 15 capturas del historial" clase="g-12">
              {actividadReciente.length === 0 ? (
                <Empty texto="Todavía no hay actividad registrada." />
              ) : (
                <div className="tabla-envoltorio" style={{ maxHeight: 380, overflowY: 'auto' }}>
                  <table className="tabla tabla-limpia">
                    <thead>
                      <tr><th>Hora</th><th>Usuario</th><th>Turno</th><th>Módulo</th><th>Código</th></tr>
                    </thead>
                    <tbody>
                      {actividadReciente.map((h) => (
                        <tr key={h.id}>
                          <td>{formatoHora(h.FechaToma)}</td>
                          <td><b>{h.Usuario}</b></td>
                          <td><span className="turno-chip mini">{h.FechaToma ? turnoDe(h.FechaToma).nombre : h.Turno || '—'}</span></td>
                          <td>{h.Modulo}</td>
                          <td className="texto-sub">{h.Codigo || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}
