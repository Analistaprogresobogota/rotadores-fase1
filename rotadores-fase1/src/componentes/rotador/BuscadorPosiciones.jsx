import { Fragment, useMemo, useState } from 'react';
import { esRevisadaHoy, estadosActualesDe, bloqueoDe } from '../../logica/posiciones';
import { calcularResultadoMacro } from '../../logica/macro';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { SectionTitle } from '../comunes/SectionTitle';
import { Empty } from '../comunes/Empty';
import { TablaCruda } from '../comunes/TablaCruda';
import { TablaMPRot } from '../comunes/TablaMPRot';
import { descargarExcel } from '../../utilidades/exportarExcel';
import { filasConteos, filasRevisadas } from '../../utilidades/filasExcel';
import { turnoActual, HORARIO_TURNO, esDelTurnoActual } from '../../utilidades/turnos';

const FILTROS = ['Todas', 'Revisadas', 'Pendientes'];

export function BuscadorPosiciones({
  vista = 'buscar',
  modulos,
  conteos,
  skus,
  turno,
  bloqueos,
  usuarioActual,
  onConfirmar,
  onEditar,
  onTerminarTurno,
  confirmando,
}) {
  const [texto, setTexto] = useState('');
  const [filtro, setFiltro] = useState('Todas');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [expandida, setExpandida] = useState(null);

  const conEstado = useMemo(
    () => modulos.map((m) => ({ ...m, revisada: esRevisadaHoy(m.Orden, conteos, turno) })),
    [modulos, conteos, turno]
  );

  // MPRot solo lista posiciones con producto asignado (igual que el Excel:
  // una posicion vacia no aparece en su hoja de rotacion).
  const resultadoMacro = useMemo(
    () => calcularResultadoMacro(conteos.filter((c) => c.Codigo), skus),
    [conteos, skus]
  );

  const coincide = (m) => {
    const q = texto.trim().toLowerCase();
    if (!q) return true;
    return (
      m.Modulo.toLowerCase().includes(q) ||
      m.Bodega.toLowerCase().includes(q) ||
      m.Fase.toLowerCase().includes(q)
    );
  };

  const sugerencias = texto.trim() ? conEstado.filter(coincide).slice(0, 8) : [];

  const filtrados = conEstado.filter((m) => {
    if (!coincide(m)) return false;
    if (filtro === 'Revisadas') return m.revisada;
    if (filtro === 'Pendientes') return !m.revisada;
    return true;
  });

  const revisadas = conEstado.filter((m) => m.revisada).length;

  function alternarExpandida(orden) {
    setExpandida((actual) => (actual === orden ? null : orden));
  }

  function abrirDesdeSugerencia(m) {
    setTexto('');
    setMostrarSugerencias(false);
    setExpandida(m.Orden);
  }

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      {vista === 'buscar' && (
        <div className="turno-banda">
          <div>
            <span className="turno-chip">Turno {turnoActual().nombre}</span>
            <span className="texto-sub">{HORARIO_TURNO[turnoActual().nombre]} · asignado automáticamente</span>
          </div>
          <div className="turno-avance">
            <b>{revisadas}</b> de {conEstado.length} posiciones revisadas
            <span className="medidor"><span style={{ width: `${conEstado.length ? (revisadas / conEstado.length) * 100 : 0}%` }} /></span>
          </div>
        </div>
      )}

      {vista === 'conteos' && (
        <>
          <SectionTitle icono="📋" titulo="Conteos" sub="Estado actual de todas las posiciones, en vivo." />
          <button className="boton-secundario boton-descarga" onClick={() => descargarExcel('conteos', filasConteos(conteos, skus))}>
            ⬇ Descargar conteos en Excel
          </button>
          <TablaCruda filas={conteos} skus={skus} columnasCompletas={false} />
        </>
      )}

      {vista === 'mprot' && (
        <>
          <SectionTitle icono="🧮" titulo="Mapa de rotación" sub="Mismo cálculo y orden que corre la macro en Excel, en vivo." />
          <TablaMPRot conteos={resultadoMacro} />
        </>
      )}

      {vista === 'buscar' && (
        <>
          <button
            className="boton-secundario boton-descarga"
            disabled={revisadas === 0}
            onClick={() => descargarExcel(`revisadas-turno-${turnoActual().nombre}`, filasRevisadas(conteos.filter((c) => esDelTurnoActual(c)), skus))}
          >
            ⬇ Descargar revisadas del turno en Excel ({revisadas})
          </button>
          <div style={{ position: 'relative' }}>
            <input
              className="campo-input"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onFocus={() => setMostrarSugerencias(true)}
              onBlur={() => setMostrarSugerencias(false)}
              placeholder="Escribe el módulo, la bodega o la fase…"
            />
            {mostrarSugerencias && sugerencias.length > 0 && (
              <div
                className="panel"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  padding: 6,
                  display: 'grid',
                  gap: 2,
                }}
              >
                {sugerencias.map((m) => (
                  <button
                    key={m.Orden}
                    className="boton-secundario"
                    style={{ textAlign: 'left', border: 'none', width: '100%' }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => abrirDesdeSugerencia(m)}
                  >
                    {m.Modulo} <span className="texto-sub">— {m.Bodega} · Fase {m.Fase}</span>
                    {m.revisada && <span style={{ color: 'var(--ok)', marginLeft: 6 }}>✓ revisada</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FILTROS.map((op) => (
              <button
                key={op}
                className={`boton-filtro${filtro === op ? ' activo' : ''}`}
                onClick={() => setFiltro(op)}
              >
                {op}
              </button>
            ))}
          </div>

          {filtrados.length === 0 ? (
            <Empty texto="No hay posiciones que coincidan con la búsqueda." />
          ) : (
            <div className="tabla-envoltorio" style={{ maxHeight: 480, overflowY: 'auto' }}>
              <table className="tabla">
                <thead>
                  <tr>
                    <th>Módulo</th>
                    <th>Bodega</th>
                    <th>Fase</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((m) => {
                    const abierta = expandida === m.Orden;
                    const existentes = abierta ? estadosActualesDe(m.Orden, conteos) : [];
                    const bloqueo = bloqueoDe(m.Orden, bloqueos);
                    const bloqueadaPorOtro = bloqueo && bloqueo.Usuario !== usuarioActual;
                    return (
                      <Fragment key={m.Orden}>
                        <tr style={{ cursor: 'pointer' }} onClick={() => alternarExpandida(m.Orden)}>
                          <td>{m.Modulo}</td>
                          <td className="texto-sub">{m.Bodega}</td>
                          <td className="texto-sub">{m.Fase}</td>
                          <td style={{ color: m.revisada ? 'var(--ok)' : 'var(--sub)', fontWeight: 600 }}>
                            {m.revisada ? 'Revisada' : 'Pendiente'}
                            {existentes.length > 1 ? ' · mixto' : ''}
                            {bloqueadaPorOtro && (
                              <span style={{ color: 'var(--warn)', marginLeft: 8, fontWeight: 700 }}>
                                🔒 en edición por {bloqueo.Usuario}
                              </span>
                            )}
                          </td>
                        </tr>
                        {abierta && (
                          <tr>
                            <td colSpan={4} style={{ background: 'var(--panel2)', padding: 12 }}>
                              <div style={{ display: 'grid', gap: 8 }}>
                                {existentes.length === 0 ? (
                                  <div className="texto-sub" style={{ fontSize: 12 }}>
                                    Sin conteos previos en esta posición.
                                  </div>
                                ) : (
                                  existentes.map((actual) => {
                                    const sku = skus.find((s) => s.Codigo === actual.Codigo);
                                    return (
                                      <div key={actual.id} className="texto-sub" style={{ fontSize: 12 }}>
                                        {actual.Codigo} — {sku?.Descripcion || 'producto no está en el maestro'} ·
                                        Estibas {actual.Estibas} · Cajas {actual.Cajas} · Unid. {actual.Unidades} ·
                                        Vence {formatoFechaLegible(actual.FechaVencimiento)}
                                        {actual.Estatus ? ` · ${actual.Estatus}` : ''}
                                      </div>
                                    );
                                  })
                                )}
                                {bloqueadaPorOtro ? (
                                  <div className="texto-sub" style={{ fontSize: 12, color: 'var(--warn)' }}>
                                    🔒 {bloqueo.Usuario} está editando esta posición ahora mismo. Espera a que
                                    termine para confirmarla o editarla.
                                  </div>
                                ) : (
                                  <div style={{ display: 'flex', gap: 8 }}>
                                    <button
                                      className="boton boton-primario"
                                      style={{ padding: '8px 14px' }}
                                      disabled={existentes.length === 0 || confirmando}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onConfirmar(m);
                                      }}
                                    >
                                      Confirmar (sin cambios)
                                    </button>
                                    <button
                                      className="boton-secundario"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onEditar(m);
                                      }}
                                    >
                                      Editar
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {vista === 'buscar' && (
        <button className="boton boton-primario" onClick={onTerminarTurno}>
          Terminar turno
        </button>
      )}
    </div>
  );
}
