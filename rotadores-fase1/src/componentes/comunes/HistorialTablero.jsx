import { useMemo, useState } from 'react';
import { TURNOS, HORARIO_TURNO, turnoDe, turnoActual } from '../../utilidades/turnos';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { descargarExcel } from '../../utilidades/exportarExcel';
import { TablaCruda } from './TablaCruda';
import { Empty } from './Empty';
import { Kpi, Panel, Medidor } from './TableroResumen';

const fmt = (n) => Number(n || 0).toLocaleString('es-CO');
const pct = (a, b) => (b ? (a / b) * 100 : 0);
const dos = (n) => String(n).padStart(2, '0');
const fechaLocal = (d) => `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
const diaCorto = (dia) => { const [, m, d] = dia.split('-'); return `${d}/${m}`; };
const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const diaSemana = (dia) => DIAS_SEMANA[new Date(`${dia}T12:00:00`).getDay()];

// Día operativo hace n días (el 10-6 de madrugada cuenta para el día en que empezó)
function haceDias(n) {
  const d = new Date(`${turnoActual().dia}T12:00:00`);
  d.setDate(d.getDate() - n);
  return fechaLocal(d);
}

const PERIODOS = [
  { id: 'todo', texto: 'Todo el historial' },
  { id: '30', texto: '30 días' },
  { id: '7', texto: '7 días' },
];

// Historial con tablero acumulado: mismos indicadores del Tablero, pero sobre
// todo lo que se ha guardado (o el periodo elegido). El filtro aplica también
// a la tabla y al Excel de abajo.
export function HistorialTablero({ historial, skus, filasExcel }) {
  const [periodo, setPeriodo] = useState('todo');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const conDia = useMemo(
    () => historial.filter((h) => h.FechaToma).map((h) => ({ h, t: turnoDe(h.FechaToma) })),
    [historial],
  );
  const primerDia = useMemo(() => conDia.reduce((min, x) => (!min || x.t.dia < min ? x.t.dia : min), ''), [conDia]);

  const rango = periodo === 'rango'
    ? { desde: desde || primerDia, hasta: hasta || turnoActual().dia }
    : periodo === 'todo' ? { desde: '', hasta: '' } : { desde: haceDias(Number(periodo) - 1), hasta: turnoActual().dia };

  const filtrados = useMemo(
    () => conDia.filter(({ t }) => (!rango.desde || t.dia >= rango.desde) && (!rango.hasta || t.dia <= rango.hasta)),
    [conDia, rango.desde, rango.hasta],
  );
  const filasTabla = useMemo(() => (periodo === 'todo' ? historial : filtrados.map((x) => x.h)), [periodo, historial, filtrados]);

  const r = useMemo(() => {
    const dias = new Map();
    const turnos = Object.fromEntries(TURNOS.map((t) => [t, 0]));
    const personas = new Map();
    const posicionesUnicas = new Set();
    let bloqueos = 0;
    filtrados.forEach(({ h, t }) => {
      const pos = h.Orden ?? h.Modulo;
      const d = dias.get(t.dia) || { dia: t.dia, capturas: 0, pos: new Set() };
      d.capturas++; d.pos.add(pos); dias.set(t.dia, d);
      turnos[t.nombre]++;
      posicionesUnicas.add(pos);
      if (h.Bloquear === 'Bloquear') bloqueos++;
      if (h.Rol === 'Rotador') {
        const p = personas.get(h.Usuario) || { usuario: h.Usuario, capturas: 0, pos: new Set(), dias: new Set(), turnos: new Set(), ultima: null };
        p.capturas++; p.pos.add(`${t.dia}|${pos}`); p.dias.add(t.dia); p.turnos.add(t.nombre);
        const f = new Date(h.FechaToma);
        if (!p.ultima || f > p.ultima) p.ultima = f;
        personas.set(h.Usuario, p);
      }
    });
    const porDia = [...dias.values()].map((d) => ({ dia: d.dia, capturas: d.capturas, posiciones: d.pos.size })).sort((a, b) => a.dia.localeCompare(b.dia));
    const revisiones = porDia.reduce((s, d) => s + d.posiciones, 0);
    const totalRot = [...personas.values()].reduce((s, p) => s + p.pos.size, 0);
    const porPersona = [...personas.values()]
      .map((p) => ({ ...p, revisiones: p.pos.size, diasTrab: p.dias.size, promedio: p.pos.size / p.dias.size, part: pct(p.pos.size, totalRot) }))
      .sort((a, b) => b.revisiones - a.revisiones);
    const mejorDia = porDia.reduce((m, d) => (!m || d.posiciones > m.posiciones ? d : m), null);
    return { porDia, turnos, porPersona, revisiones, posicionesUnicas: posicionesUnicas.size, bloqueos, mejorDia };
  }, [filtrados]);

  const diasActivos = r.porDia.length;
  const promedioDia = diasActivos ? r.revisiones / diasActivos : 0;
  const maxDia = Math.max(...r.porDia.map((d) => d.posiciones), 1);
  const maxTurno = Math.max(...TURNOS.map((t) => r.turnos[t]), 1);
  const totalTurnos = TURNOS.reduce((s, t) => s + r.turnos[t], 0);
  const turnoFuerte = TURNOS.reduce((m, t) => (r.turnos[t] > r.turnos[m] ? t : m), TURNOS[0]);
  const maxPersona = Math.max(...r.porPersona.map((p) => p.revisiones), 1);
  const textoRango = filtrados.length
    ? `${formatoFechaLegible(r.porDia[0].dia)} – ${formatoFechaLegible(r.porDia[diasActivos - 1].dia)}`
    : 'sin registros';

  function elegirPeriodo(id) {
    setPeriodo(id);
    setDesde(''); setHasta('');
  }
  function cambiarFecha(campo, valor) {
    setPeriodo('rango');
    if (campo === 'desde') setDesde(valor); else setHasta(valor);
  }

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div className="historial-filtros">
        <div className="historial-periodos">
          {PERIODOS.map((p) => (
            <button key={p.id} className={`boton-filtro${periodo === p.id ? ' activo' : ''}`} onClick={() => elegirPeriodo(p.id)}>{p.texto}</button>
          ))}
        </div>
        <div className="historial-rango">
          <label>Desde<input type="date" className="campo-input" value={periodo === 'rango' ? desde : rango.desde} max={hasta || undefined} onChange={(e) => cambiarFecha('desde', e.target.value)} /></label>
          <label>Hasta<input type="date" className="campo-input" value={periodo === 'rango' ? hasta : rango.hasta} min={desde || undefined} onChange={(e) => cambiarFecha('hasta', e.target.value)} /></label>
        </div>
        <span className="texto-sub">Periodo: <b>{textoRango}</b> · {fmt(filtrados.length)} capturas</span>
      </div>

      {filtrados.length === 0 ? (
        <Empty texto="No hay registros en el periodo elegido." />
      ) : (
        <div className="tablero-im">
          <div className="kpis-im">
            <Kpi etiqueta="Posiciones revisadas" valor={fmt(r.revisiones)} pie="Suma de lo revisado cada día" />
            <Kpi etiqueta="Días con actividad" valor={fmt(diasActivos)} pie={r.mejorDia ? `Mejor día: ${diaCorto(r.mejorDia.dia)} (${fmt(r.mejorDia.posiciones)})` : ''} />
            <Kpi etiqueta="Promedio por día" valor={fmt(Math.round(promedioDia))} unidad=" pos" estado="verde" pie="Posiciones revisadas por día activo" />
            <Kpi etiqueta="Rotadores participantes" valor={r.porPersona.length} pie={r.porPersona.length ? `Líder: ${r.porPersona[0].usuario}` : 'Sin rotadores en el periodo'} />
            <Kpi etiqueta="Posiciones distintas" valor={fmt(r.posicionesUnicas)} viz={<Medidor valor={pct(r.bloqueos, filtrados.length)} />} pie={`${fmt(r.bloqueos)} capturas con bloqueo`} />
          </div>

          <div className="tablero-grid">
            <Panel titulo="Tendencia por día" sub="Posiciones revisadas en cada día operativo del periodo" clase="g-12"
              pie={<><span>Total: <b>{fmt(r.revisiones)}</b></span><span>Promedio: <b>{fmt(Math.round(promedioDia))}</b> por día</span></>}>
              <div className="barras-dia">
                {r.porDia.map((d) => (
                  <div key={d.dia} className="bd" title={`${formatoFechaLegible(d.dia)}: ${d.posiciones} posiciones · ${d.capturas} capturas`}>
                    <span className="bd-valor">{fmt(d.posiciones)}</span>
                    <span className="bd-pista"><span style={{ height: `${Math.max(3, (d.posiciones / maxDia) * 100)}%` }} /></span>
                    <span className="bd-etq">{diaCorto(d.dia)}</span>
                    <span className="bd-sub">{diaSemana(d.dia)}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel titulo="Capturas por turno" sub="Acumulado del periodo en cada turno" clase="g-6"
              pie={<><span>Turno más activo: <b>{turnoFuerte}</b></span><span>{Math.round(pct(r.turnos[turnoFuerte], totalTurnos))}% de las capturas</span></>}>
              <div className="barras-turno">
                {TURNOS.map((t) => (
                  <div key={t} className={`bt${t === turnoFuerte ? ' actual' : ''}`} title={`Turno ${t}: ${r.turnos[t]} capturas`}>
                    <span className="bt-valor">{fmt(r.turnos[t])}</span>
                    <span className="bt-pista"><span style={{ height: `${Math.max(r.turnos[t] ? 4 : 0, (r.turnos[t] / maxTurno) * 100)}%` }} /></span>
                    <span className="bt-etq">{t}</span>
                    <span className="bt-sub">{HORARIO_TURNO[t]}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel titulo="Participación por rotador" sub="Parte de las posiciones revisadas que hizo cada persona" clase="g-6">
              {r.porPersona.length === 0 ? (
                <p className="texto-sub">No hay capturas de rotadores en el periodo.</p>
              ) : (
                <div className="barras-h">
                  {r.porPersona.slice(0, 8).map((p) => (
                    <div key={p.usuario} className="bh" title={`${p.usuario}: ${p.revisiones}`}>
                      <span className="bh-etq">{p.usuario}</span>
                      <span className="bh-val">{Math.round(p.part)}%</span>
                      <span className="bh-pista"><span style={{ width: `${Math.max(2, p.part)}%` }} /></span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel titulo="Desempeño acumulado por rotador" sub="Todo lo registrado por cada persona en el periodo" clase="g-12">
              {r.porPersona.length === 0 ? (
                <Empty texto="No hay capturas de rotadores en el periodo." />
              ) : (
                <div className="tabla-envoltorio" style={{ maxHeight: 420, overflowY: 'auto' }}>
                  <table className="tabla tabla-limpia tabla-personas">
                    <thead>
                      <tr><th>#</th><th>Rotador</th><th>Posiciones revisadas</th><th>Días trabajados</th><th>Promedio por día</th><th>Turnos</th><th>Última captura</th><th>Participación</th></tr>
                    </thead>
                    <tbody>
                      {r.porPersona.map((p, i) => (
                        <tr key={p.usuario}>
                          <td><span className={`puesto p${i + 1}`}>{i + 1}</span></td>
                          <td><b>{p.usuario}</b><br /><small className="texto-sub">{fmt(p.capturas)} capturas</small></td>
                          <td>
                            <div className="persona-barra">
                              <span className="pb-pista"><span style={{ width: `${Math.max(3, (p.revisiones / maxPersona) * 100)}%` }} /></span>
                              <b>{fmt(p.revisiones)}</b>
                            </div>
                          </td>
                          <td><b>{fmt(p.diasTrab)}</b></td>
                          <td>{p.promedio.toLocaleString('es-CO', { maximumFractionDigits: 1 })} <small className="texto-sub">pos/día</small></td>
                          <td>{[...p.turnos].map((t) => <span key={t} className="turno-chip mini" style={{ marginRight: 4 }}>{t}</span>)}</td>
                          <td className="texto-sub">{p.ultima.toLocaleString('es-CO', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                          <td><b>{Math.round(p.part)}%</b></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </div>
        </div>
      )}

      <div className="historial-tabla-cab">
        <h3>Registros del periodo <small className="texto-sub">({fmt(filasTabla.length)})</small></h3>
        <button className="boton-secundario" onClick={() => descargarExcel('historial', filasExcel(filasTabla))}>⬇ Descargar Excel</button>
      </div>
      <TablaCruda filas={filasTabla} skus={skus} />
    </div>
  );
}
