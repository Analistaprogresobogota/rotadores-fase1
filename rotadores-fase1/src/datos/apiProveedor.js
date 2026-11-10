// Proveedor que habla con api-rotadores (la API propia que reemplaza a
// Supabase, ver /api-rotadores en la raiz del proyecto), la cual a su vez
// habla con la base de datos de Tecnologia en Azure. Misma forma que
// crearSupabaseProveedor(), para que proveedorDatos.js pueda intercambiarlas
// sin que el resto de la app se entere de cual esta activa.
import { CONFIG } from '../config';
import { cabeceraSesion, avisarSesionVencida, obtenerToken } from './tokenSesion';
import { SKUS_DEMO } from './skusDemo';
import { MODULOS_DEMO } from './modulosDemo';
import { leerCache, escribirCache, encolar, activarSincronizacionAutomatica } from './colaSincronizacion';

async function solicitud(ruta, opciones = {}) {
  const resp = await fetch(`${CONFIG.apiUrl}${ruta}`, {
    ...opciones,
    headers: { 'Content-Type': 'application/json', ...cabeceraSesion() },
  });
  if (!resp.ok) {
    const cuerpo = await resp.json().catch(() => ({}));
    if (resp.status === 401 && !ruta.endsWith('/login')) avisarSesionVencida();
    const error = new Error(cuerpo.error || `api-rotadores respondio ${resp.status}`);
    error.status = resp.status;
    throw error;
  }
  if (resp.status === 204) return null;
  return resp.json();
}

async function obtenerConCache(tabla, ruta) {
  try {
    const datos = await solicitud(ruta);
    escribirCache(tabla, datos);
    return datos;
  } catch {
    // sin conexion (o la API caida): se sirve la ultima copia conocida
    return leerCache(tabla);
  }
}

// Traduce una operacion encolada (misma forma que usa Supabase: {metodo,
// tabla, filtro, payload}) a la ruta REST correspondiente de api-rotadores.
async function ejecutarOperacionRemota(op) {
  const { metodo, tabla, filtro, payload } = op;
  if (tabla === 'conteos') {
    if (metodo === 'POST') return [await solicitud('/conteos', { method: 'POST', body: JSON.stringify(payload) })];
    const id = filtro?.match(/id=eq\.(.+)/)?.[1];
    if (metodo === 'DELETE') return [await solicitud(`/conteos/${id}`, { method: 'DELETE' })];
    return [await solicitud(`/conteos/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })];
  }
  if (tabla === 'historial') {
    return [await solicitud('/historial', { method: 'POST', body: JSON.stringify(payload) })];
  }
  throw new Error(`Tabla no soportada por api-rotadores: ${tabla}`);
}

function actualizarCacheLocal(tabla, fila, idExistente) {
  const actuales = leerCache(tabla);
  if (idExistente) {
    escribirCache(tabla, actuales.map((f) => (f.id === idExistente ? fila : f)));
    return;
  }
  const yaExiste = actuales.some((f) => f.id === fila.id);
  escribirCache(tabla, yaExiste ? actuales.map((f) => (f.id === fila.id ? fila : f)) : [...actuales, fila]);
}

export function crearApiProveedor() {
  activarSincronizacionAutomatica((op) =>
    ejecutarOperacionRemota(op).then(([fila]) => {
      if (op.metodo === 'DELETE') return; // ya se quito del cache al encolar
      if (op.idLocal) actualizarCacheLocal(op.tabla, fila, op.idLocal);
    })
  );

  return {
    async obtenerSkus() {
      return SKUS_DEMO;
    },
    async obtenerModulos() {
      return MODULOS_DEMO;
    },

    async obtenerConteos() {
      return obtenerConCache('conteos', '/conteos');
    },
    async obtenerHistorial() {
      return obtenerConCache('historial', '/historial');
    },
    async obtenerBloqueos() {
      return obtenerConCache('bloqueos_edicion', '/bloqueos');
    },

    async guardarConteo(datos, idExistente) {
      try {
        const fila = idExistente
          ? await solicitud(`/conteos/${idExistente}`, { method: 'PATCH', body: JSON.stringify(datos) })
          : await solicitud('/conteos', { method: 'POST', body: JSON.stringify(datos) });
        actualizarCacheLocal('conteos', fila, idExistente);
        return fila;
      } catch {
        const filaOptimista = { id: idExistente || `pendiente-${Date.now()}`, ...datos };
        encolar({
          metodo: idExistente ? 'PATCH' : 'POST',
          tabla: 'conteos',
          filtro: idExistente ? `id=eq.${idExistente}` : undefined,
          payload: datos,
          idLocal: idExistente || filaOptimista.id,
        });
        actualizarCacheLocal('conteos', filaOptimista, idExistente);
        return filaOptimista;
      }
    },

    // Borra un conteo puntual (se usa al quitar un producto de una posicion
    // mixta, para que el registro viejo no quede huerfano en la base).
    async eliminarConteo(id) {
      try {
        await solicitud(`/conteos/${id}`, { method: 'DELETE' });
      } catch {
        encolar({ metodo: 'DELETE', tabla: 'conteos', filtro: `id=eq.${id}`, idLocal: id });
      }
      escribirCache(
        'conteos',
        leerCache('conteos').filter((c) => c.id !== id)
      );
    },

    async crearHistorial(datos) {
      try {
        const fila = await solicitud('/historial', { method: 'POST', body: JSON.stringify(datos) });
        actualizarCacheLocal('historial', fila);
        return fila;
      } catch {
        const filaOptimista = { id: `pendiente-${Date.now()}`, ...datos };
        encolar({ metodo: 'POST', tabla: 'historial', payload: datos, idLocal: filaOptimista.id });
        actualizarCacheLocal('historial', filaOptimista);
        return filaOptimista;
      }
    },

    // Bloqueo de edicion: "mejor esfuerzo", no se encola si falla (si no hay
    // internet no hay con quien pelearse la posicion de todos modos).
    async bloquearPosicion(orden, usuarioActual, turno) {
      try {
        await solicitud('/bloqueos', { method: 'POST', body: JSON.stringify({ Orden: orden, Usuario: usuarioActual, Turno: turno }) });
      } catch {
        // sin conexion: no se puede avisar a los demas, se sigue igual
      }
    },

    async liberarPosicion(orden) {
      try {
        await solicitud(`/bloqueos/${orden}`, { method: 'DELETE' });
      } catch {
        // no-op: el bloqueo vence solo despues de unos minutos
      }
    },

    async actualizarResultadoMacro(filas) {
      const filasDb = filas.map((f) => ({
        id: f.id,
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
      try {
        await solicitud('/resultado-macro', { method: 'PUT', body: JSON.stringify(filasDb) });
      } catch {
        // mejor esfuerzo: si no hay internet ahorita, se reintenta solo en
        // el siguiente cambio.
      }
    },

    // Tiempo real via Server-Sent Events — equivalente simplificado al canal
    // de Supabase Realtime. Se suscribe a los 3 flujos de eventos de la API.
    suscribirseCambios(callback) {
      if (typeof EventSource === 'undefined') return () => {};
      const fuentes = ['/conteos/eventos', '/historial/eventos', '/bloqueos/eventos'].map((ruta) => {
        // EventSource no permite cabeceras: el token va en la URL (solo estas rutas lo aceptan asi)
        const fuente = new EventSource(`${CONFIG.apiUrl}${ruta}?token=${encodeURIComponent(obtenerToken() || '')}`);
        fuente.onmessage = () => callback();
        return fuente;
      });
      return () => fuentes.forEach((f) => f.close());
    },
  };
}
