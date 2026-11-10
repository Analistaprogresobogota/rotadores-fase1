import { createClient } from '@supabase/supabase-js';
import { CONFIG } from '../config';
import { SKUS_DEMO } from './skusDemo';
import { MODULOS_DEMO } from './modulosDemo';
import { leerCache, escribirCache, encolar, activarSincronizacionAutomatica } from './colaSincronizacion';

function headersBase(extra = {}) {
  return {
    apikey: CONFIG.supabaseAnonKey,
    Authorization: `Bearer ${CONFIG.supabaseAnonKey}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function obtenerConCache(tabla, orden) {
  try {
    const url = `${CONFIG.supabaseUrl}/rest/v1/${tabla}?select=*${orden ? `&order=${orden}` : ''}`;
    const res = await fetch(url, { headers: headersBase() });
    if (!res.ok) throw new Error(`GET ${tabla} ${res.status}`);
    const datos = await res.json();
    escribirCache(tabla, datos);
    return datos;
  } catch {
    // sin conexion (o Supabase caido): se sirve la ultima copia conocida
    return leerCache(tabla);
  }
}

// Ejecuta una operacion de escritura contra Supabase. Lanza si falla (red o
// error del server) para que quien la llame decida si encola o no.
async function ejecutarOperacionRemota(op) {
  const { metodo, tabla, filtro, payload } = op;
  const url = `${CONFIG.supabaseUrl}/rest/v1/${tabla}${filtro ? `?${filtro}` : ''}`;
  const res = await fetch(url, {
    method: metodo,
    headers: headersBase({ Prefer: metodo === 'DELETE' ? 'return=minimal' : 'return=representation' }),
    body: metodo === 'DELETE' ? undefined : JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`${metodo} ${tabla} ${res.status}`);
  return metodo === 'DELETE' ? null : res.json();
}

function actualizarCacheLocal(tabla, fila, idExistente) {
  const actuales = leerCache(tabla);
  if (idExistente) {
    escribirCache(
      tabla,
      actuales.map((f) => (f.id === idExistente ? fila : f))
    );
    return;
  }
  const yaExiste = actuales.some((f) => f.id === fila.id);
  escribirCache(tabla, yaExiste ? actuales.map((f) => (f.id === fila.id ? fila : f)) : [...actuales, fila]);
}

let clienteRealtime = null;
function obtenerClienteRealtime() {
  if (!clienteRealtime) clienteRealtime = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
  return clienteRealtime;
}

export function crearSupabaseProveedor() {
  activarSincronizacionAutomatica(ejecutarOperacionRemota);

  return {
    // Skus y Modulos son datos maestros que casi no cambian: quedan
    // embebidos en la app (no se leen de Supabase), asi el APK/HTML sigue
    // funcionando igual de rapido y sin gastar cuota de la base de datos.
    async obtenerSkus() {
      return SKUS_DEMO;
    },
    async obtenerModulos() {
      return MODULOS_DEMO;
    },

    async obtenerConteos() {
      return obtenerConCache('conteos');
    },
    async obtenerHistorial() {
      return obtenerConCache('historial', 'FechaToma.desc');
    },
    async obtenerRotadores() {
      return obtenerConCache('rotadores');
    },
    async obtenerBloqueos() {
      return obtenerConCache('bloqueos_edicion');
    },

    // Si Supabase responde, queda guardado ya mismo (en linea). Si falla por
    // falta de red, se aplica de una vez en la cache local (para que el
    // Rotador vea su propio cambio sin esperar) y se encola para reintentar
    // cuando vuelva el internet.
    async guardarConteo(datos, idExistente) {
      const op = {
        metodo: idExistente ? 'PATCH' : 'POST',
        tabla: 'conteos',
        filtro: idExistente ? `id=eq.${idExistente}` : undefined,
        payload: datos,
      };
      try {
        const res = await ejecutarOperacionRemota(op);
        const fila = Array.isArray(res) ? res[0] : res;
        actualizarCacheLocal('conteos', fila, idExistente);
        return fila;
      } catch {
        const filaOptimista = { id: idExistente || `pendiente-${Date.now()}`, ...datos };
        encolar(op);
        actualizarCacheLocal('conteos', filaOptimista, idExistente);
        return filaOptimista;
      }
    },

    // Borra un conteo puntual (se usa al quitar un producto de una posicion
    // mixta, para que el registro viejo no quede huerfano en la base).
    async eliminarConteo(id) {
      const op = { metodo: 'DELETE', tabla: 'conteos', filtro: `id=eq.${id}` };
      try {
        await ejecutarOperacionRemota(op);
      } catch {
        encolar(op);
      }
      escribirCache(
        'conteos',
        leerCache('conteos').filter((c) => c.id !== id)
      );
    },

    async crearHistorial(datos) {
      const op = { metodo: 'POST', tabla: 'historial', payload: datos };
      try {
        const res = await ejecutarOperacionRemota(op);
        const fila = Array.isArray(res) ? res[0] : res;
        actualizarCacheLocal('historial', fila);
        return fila;
      } catch {
        const filaOptimista = { id: `pendiente-${Date.now()}`, ...datos };
        encolar(op);
        actualizarCacheLocal('historial', filaOptimista);
        return filaOptimista;
      }
    },

    async crearRotador(datos) {
      const payload = { Activo: 'Si', ...datos };
      const op = { metodo: 'POST', tabla: 'rotadores', payload };
      try {
        const res = await ejecutarOperacionRemota(op);
        const fila = Array.isArray(res) ? res[0] : res;
        actualizarCacheLocal('rotadores', fila);
        return fila;
      } catch {
        const filaOptimista = { id: `pendiente-${Date.now()}`, ...payload };
        encolar(op);
        actualizarCacheLocal('rotadores', filaOptimista);
        return filaOptimista;
      }
    },

    async eliminarRotador(id) {
      const op = { metodo: 'DELETE', tabla: 'rotadores', filtro: `id=eq.${id}` };
      try {
        await ejecutarOperacionRemota(op);
      } catch {
        encolar(op);
      }
      escribirCache(
        'rotadores',
        leerCache('rotadores').filter((r) => r.id !== id)
      );
    },

    // Bloqueo de edicion: "mejor esfuerzo", no se encola si falla (si no hay
    // internet no hay con quien pelearse la posicion de todos modos).
    async bloquearPosicion(orden, usuarioActual, turno) {
      try {
        await fetch(`${CONFIG.supabaseUrl}/rest/v1/bloqueos_edicion?on_conflict=Orden`, {
          method: 'POST',
          headers: headersBase({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
          body: JSON.stringify({ Orden: orden, Usuario: usuarioActual, Turno: turno, CreadoEn: new Date().toISOString() }),
        });
      } catch {
        // sin conexion: no se puede avisar a los demas, se sigue igual
      }
    },

    async liberarPosicion(orden) {
      try {
        await fetch(`${CONFIG.supabaseUrl}/rest/v1/bloqueos_edicion?Orden=eq.${orden}`, {
          method: 'DELETE',
          headers: headersBase({ Prefer: 'return=minimal' }),
        });
      } catch {
        // no-op: el bloqueo vence solo despues de unos minutos
      }
    },

    // Vuelve a calcular "Resultado de la macro" (ver calcularResultadoMacro
    // en logica/macro.js) y reemplaza por completo la tabla resultado_macro
    // en Supabase con el resultado actual — asi se puede consultar directo
    // desde el Table Editor de Supabase, no solo desde la app. `filas` ya
    // viene calculado (con _sku/_calc/ordenMacro) por quien llama.
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
        // Supabase exige un filtro explicito para poder borrar (no deja
        // hacer DELETE sin WHERE) — "id=not.is.null" siempre es verdadero
        // (id es la llave primaria, nunca es null), asi que en la practica
        // borra todo antes de subir el calculo actualizado.
        await fetch(`${CONFIG.supabaseUrl}/rest/v1/resultado_macro?id=not.is.null`, {
          method: 'DELETE',
          headers: headersBase({ Prefer: 'return=minimal' }),
        });
        const tamano = 300;
        for (let i = 0; i < filasDb.length; i += tamano) {
          const lote = filasDb.slice(i, i + tamano);
          await fetch(`${CONFIG.supabaseUrl}/rest/v1/resultado_macro`, {
            method: 'POST',
            headers: headersBase({ Prefer: 'return=minimal' }),
            body: JSON.stringify(lote),
          });
        }
      } catch {
        // mejor esfuerzo: si no hay internet ahorita, se reintenta solo en
        // el siguiente cambio (el valor en Supabase queda un poco atrasado,
        // pero la app en el celular sigue mostrando el calculo correcto).
      }
    },

    // Avisa (via websocket de Supabase Realtime) cuando algun Conteo,
    // Historial o Bloqueo cambia — para que todos los Rotadores conectados
    // vean los cambios de los demas sin tener que recargar la pagina.
    suscribirseCambios(callback) {
      const cliente = obtenerClienteRealtime();
      const canal = cliente
        .channel('rotadores-cambios-en-vivo')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'conteos' }, callback)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'historial' }, callback)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bloqueos_edicion' }, callback)
        .subscribe();
      return () => cliente.removeChannel(canal);
    },
  };
}
