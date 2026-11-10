import { useEffect, useMemo, useState } from 'react';
import { useSession } from '../../contexto/useSession';
import { useDatos } from '../../hooks/useDatos';
import { calcularIndicadores, calcularResultadoMacro } from '../../logica/macro';
import { modulosActivosOrdenados } from '../../logica/modulos';
import { estadosActualesDe } from '../../logica/posiciones';
import { CONFIG } from '../../config';
import { formatoISODatetime } from '../../utilidades/fechas';
import { Cargando } from '../comunes/Cargando';
import { ErrorAviso } from '../comunes/ErrorAviso';
import { Empty } from '../comunes/Empty';
import { turnoActual } from '../../utilidades/turnos';
import { BuscadorPosiciones } from './BuscadorPosiciones';
import { FormularioConteo } from './FormularioConteo';
import { ResumenCalculoEnVivo } from './ResumenCalculoEnVivo';
import { ResumenTurno } from './ResumenTurno';

const LINEA_VACIA = {
  id: null,
  Codigo: '',
  Estibas: '',
  Cajas: '0',
  Unidades: '0',
  FechaVencimiento: '',
  Estatus: '',
  Observaciones: '',
  Bloquear: 'No',
};

export function VistaRotador({ seccion = 'buscar' }) {
  const { usuario, rol, turno, elegirTurno, salir } = useSession();
  const {
    cargando,
    error,
    obtenerSkus,
    obtenerModulos,
    obtenerConteos,
    obtenerHistorial,
    guardarConteo,
    eliminarConteo,
    crearHistorial,
    obtenerBloqueos,
    bloquearPosicion,
    liberarPosicion,
    suscribirseCambios,
    actualizarResultadoMacro,
  } = useDatos();

  const [skus, setSkus] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [conteos, setConteos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);
  const [posicionEditando, setPosicionEditando] = useState(null);
  const [lineas, setLineas] = useState([LINEA_VACIA]);
  const [guardando, setGuardando] = useState(false);
  const [turnoTerminado, setTurnoTerminado] = useState(false);

  useEffect(() => {
    obtenerSkus().then(setSkus).catch(() => {});
    obtenerModulos().then(setModulos).catch(() => {});
    obtenerConteos().then(setConteos).catch(() => {});
    obtenerHistorial().then(setHistorial).catch(() => {});
    obtenerBloqueos().then(setBloqueos).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tiempo real: cuando cualquier Rotador (en este dispositivo u otro)
  // guarda un conteo, crea historial, o bloquea/libera una posicion, todos
  // los demas conectados lo ven solos, sin recargar la pagina.
  useEffect(() => {
    const cancelar = suscribirseCambios(() => {
      obtenerConteos().then(setConteos).catch(() => {});
      obtenerHistorial().then(setHistorial).catch(() => {});
      obtenerBloqueos().then(setBloqueos).catch(() => {});
    });
    return cancelar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cada vez que cambian los Conteos (propios o de otro rotador via tiempo
  // real), se vuelve a calcular "Resultado de la macro" y se sube a
  // Supabase (tabla resultado_macro) — asi queda consultable desde ahi
  // tambien, no solo en vivo dentro de la app.
  useEffect(() => {
    if (skus.length === 0 || conteos.length === 0) return;
    actualizarResultadoMacro(calcularResultadoMacro(conteos, skus));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conteos, skus]);

  // Turno automático según la hora (6-2, 2-10, 10-6): ya no se le pregunta
  // al rotador. Se revisa cada minuto por si el turno cambia con la app abierta.
  useEffect(() => {
    const ajustar = () => {
      const t = turnoActual().nombre;
      if (t !== turno) elegirTurno(t);
    };
    ajustar();
    const id = setInterval(ajustar, 60000);
    return () => clearInterval(id);
  }, [turno, elegirTurno]);

  const modulosActivos = useMemo(() => modulosActivosOrdenados(modulos), [modulos]);

  const calcsPorLinea = useMemo(
    () =>
      lineas.map((l) => {
        const sku = skus.find((s) => s.Codigo === l.Codigo) || null;
        if (!sku || !l.FechaVencimiento) return null;
        return calcularIndicadores(l, sku);
      }),
    [lineas, skus]
  );

  if (!turno) {
    return <Cargando texto="Asignando turno…" />;
  }

  if (cargando && modulosActivos.length === 0) {
    return <Cargando texto="Cargando módulos…" />;
  }

  if (modulosActivos.length === 0) {
    return <Empty texto="No hay módulos activos configurados en la lista Modulos." />;
  }

  function editarPosicion(modulo) {
    const existentes = estadosActualesDe(modulo.Orden, conteos);
    setLineas(
      existentes.length > 0
        ? existentes.map((c) => ({
            id: c.id,
            Codigo: c.Codigo,
            Estibas: String(c.Estibas ?? ''),
            Cajas: String(c.Cajas ?? '0'),
            Unidades: String(c.Unidades ?? '0'),
            FechaVencimiento: c.FechaVencimiento || '',
            Estatus: c.Estatus || '',
            Observaciones: c.Observaciones || '',
            Bloquear: c.Bloquear === 'Bloquear' ? 'Bloquear' : 'No',
          }))
        : [LINEA_VACIA]
    );
    setPosicionEditando(modulo);
    // Avisa a los demas rotadores que esta posicion esta siendo editada,
    // para que no la toquen al mismo tiempo (se ve en BuscadorPosiciones).
    setBloqueos((actuales) => [
      ...actuales.filter((b) => b.Orden !== modulo.Orden),
      { Orden: modulo.Orden, Usuario: usuario, Turno: turno, CreadoEn: new Date().toISOString() },
    ]);
    bloquearPosicion(modulo.Orden, usuario, turno);
  }

  function cancelarEdicion() {
    if (posicionEditando) {
      setBloqueos((actuales) => actuales.filter((b) => b.Orden !== posicionEditando.Orden));
      liberarPosicion(posicionEditando.Orden);
    }
    setPosicionEditando(null);
  }

  function actualizarLinea(indice, campo, valor) {
    setLineas((ls) => ls.map((l, i) => (i === indice ? { ...l, [campo]: valor } : l)));
  }

  // Para modulos mixtos: agrega otro producto a la misma posicion, sin tocar
  // los demas ni cambiar ninguna columna del modelo de datos.
  function agregarProducto() {
    setLineas((ls) => [...ls, LINEA_VACIA]);
  }

  function quitarProducto(indice) {
    setLineas((ls) => ls.filter((_, i) => i !== indice));
  }

  // Guarda tanto en Conteos (estado actual de la posicion, se actualiza en el
  // mismo lugar) como en Historial (log append-only, nunca se edita ni se borra).
  async function guardarEnAmbasListas(datos, idExistente) {
    const actualizado = await guardarConteo(datos, idExistente);
    const registroHistorial = await crearHistorial(datos);
    setConteos((lista) =>
      idExistente ? lista.map((c) => (c.id === idExistente ? actualizado : c)) : [...lista, actualizado]
    );
    setHistorial((lista) => [registroHistorial, ...lista]);
  }

  async function confirmarPosicion(modulo) {
    const existentes = estadosActualesDe(modulo.Orden, conteos);
    if (existentes.length === 0) return;
    setGuardando(true);
    try {
      for (const actual of existentes) {
        const datos = {
          Modulo: modulo.Modulo,
          Orden: modulo.Orden,
          Codigo: actual.Codigo,
          Estibas: actual.Estibas,
          Cajas: actual.Cajas,
          Unidades: actual.Unidades,
          FechaVencimiento: actual.FechaVencimiento,
          Estatus: actual.Estatus || '',
          Observaciones: actual.Observaciones || '',
          Bloquear: actual.Bloquear === 'Bloquear' ? 'Bloquear' : 'No',
          Usuario: usuario,
          Rol: rol,
          Turno: turno,
          FechaToma: formatoISODatetime(new Date()),
          Sede: CONFIG.sede,
        };
        await guardarEnAmbasListas(datos, actual.id);
      }
    } catch {
      // el mensaje de error ya se muestra via ErrorAviso
    } finally {
      setGuardando(false);
    }
  }

  const puedeGuardar =
    Boolean(posicionEditando) &&
    lineas.length > 0 &&
    lineas.every((l) => skus.some((s) => s.Codigo === l.Codigo) && l.FechaVencimiento) &&
    !guardando;

  async function guardarEdicion() {
    if (!puedeGuardar) return;
    setGuardando(true);
    try {
      // Productos que existian al abrir esta edicion (posicion mixta) y ya
      // no estan en `lineas`: el Rotador le dio "Quitar este producto" a
      // alguno que ya estaba guardado de antes. Sin este borrado, el
      // registro viejo quedaba huerfano en la base para siempre — nunca se
      // actualizaba ni se borraba, solo se acumulaba.
      const idsOriginales = estadosActualesDe(posicionEditando.Orden, conteos).map((c) => c.id);
      const idsQueQuedan = new Set(lineas.filter((l) => l.id).map((l) => l.id));
      const idsABorrar = idsOriginales.filter((id) => !idsQueQuedan.has(id));
      for (const id of idsABorrar) {
        await eliminarConteo(id);
        setConteos((lista) => lista.filter((c) => c.id !== id));
      }

      for (const l of lineas) {
        const datos = {
          Modulo: posicionEditando.Modulo,
          Orden: posicionEditando.Orden,
          Codigo: l.Codigo,
          Estibas: Number(l.Estibas) || 0,
          Cajas: Number(l.Cajas) || 0,
          Unidades: Number(l.Unidades) || 0,
          FechaVencimiento: l.FechaVencimiento,
          Estatus: l.Estatus,
          Observaciones: l.Observaciones,
          Bloquear: l.Bloquear === 'Bloquear' ? 'Bloquear' : 'No',
          Usuario: usuario,
          Rol: rol,
          Turno: turno,
          FechaToma: formatoISODatetime(new Date()),
          Sede: CONFIG.sede,
        };
        await guardarEnAmbasListas(datos, l.id || undefined);
      }
      setBloqueos((actuales) => actuales.filter((b) => b.Orden !== posicionEditando.Orden));
      liberarPosicion(posicionEditando.Orden);
      setPosicionEditando(null);
    } catch {
      // el mensaje de error ya se muestra via ErrorAviso
    } finally {
      setGuardando(false);
    }
  }

  if (posicionEditando) {
    return (
      <div style={{ display: 'grid', gap: 18 }}>
        <button className="boton-secundario" style={{ justifySelf: 'start' }} onClick={cancelarEdicion}>
          ← Cancelar edición
        </button>
        <ErrorAviso mensaje={error} />
        <div className="campo">
          <label className="campo-label">Ubicación</label>
          <div className="campo-input" style={{ display: 'flex', alignItems: 'center' }}>
            {posicionEditando.Modulo} — {posicionEditando.Bodega} · Fase {posicionEditando.Fase}
          </div>
        </div>

        {lineas.map((linea, indice) => (
          <div key={indice} className="panel" style={{ display: 'grid', gap: 12 }}>
            {lineas.length > 1 && (
              <div className="texto-sub" style={{ fontSize: 12, fontWeight: 700 }}>
                PRODUCTO {indice + 1}
              </div>
            )}
            <FormularioConteo
              idPrefijo={`linea-${indice}`}
              linea={linea}
              actualizar={(campo, valor) => actualizarLinea(indice, campo, valor)}
              skus={skus}
              onQuitar={lineas.length > 1 ? () => quitarProducto(indice) : null}
            />
            {calcsPorLinea[indice] && <ResumenCalculoEnVivo calc={calcsPorLinea[indice]} />}
          </div>
        ))}

        <button className="boton-secundario" style={{ justifySelf: 'start' }} onClick={agregarProducto}>
          + Añadir otro producto (módulo mixto)
        </button>

        <button className="boton boton-primario" disabled={!puedeGuardar} onClick={guardarEdicion}>
          {guardando ? 'Guardando…' : 'Guardar conteo'}
        </button>
      </div>
    );
  }

  if (turnoTerminado) {
    return <ResumenTurno historial={historial} skus={skus} onFinalizar={salir} />;
  }

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <ErrorAviso mensaje={error} />
      <BuscadorPosiciones
        vista={seccion}
        modulos={modulosActivos}
        conteos={conteos}
        skus={skus}
        turno={turno}
        bloqueos={bloqueos}
        usuarioActual={usuario}
        onConfirmar={confirmarPosicion}
        onEditar={editarPosicion}
        onTerminarTurno={() => setTurnoTerminado(true)}
        confirmando={guardando}
      />
    </div>
  );
}
