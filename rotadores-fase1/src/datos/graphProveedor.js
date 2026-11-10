import { graphFetch, obtenerTodosLosItems } from './graphClient';
import { CONFIG } from '../config';

const rutaLista = (idLista) => `/sites/${CONFIG.siteId}/lists/${idLista}/items`;

// Proveedor real contra Microsoft Graph / listas de SharePoint.
// auth = { obtenerToken: () => Promise<string> } (ver src/auth/useAuth.js)
export function crearGraphProveedor(auth) {
  return {
    async obtenerSkus() {
      const token = await auth.obtenerToken();
      const items = await obtenerTodosLosItems(rutaLista(CONFIG.listSkusId), token);
      return items.map((item) => item.fields);
    },

    async obtenerModulos() {
      const token = await auth.obtenerToken();
      const items = await obtenerTodosLosItems(rutaLista(CONFIG.listModulosId), token);
      return items.map((item) => item.fields);
    },

    // Conteos = estado ACTUAL de cada posicion (un item por Modulo/Orden),
    // igual que la hoja "Conteos" del Excel real: se actualiza en el mismo
    // lugar, no se acumula.
    async obtenerConteos() {
      const token = await auth.obtenerToken();
      const items = await obtenerTodosLosItems(rutaLista(CONFIG.listConteosId), token);
      return items.map((item) => ({ id: item.id, ...item.fields }));
    },

    // Si ya existe un item para esa posicion (idExistente), lo actualiza (PATCH).
    // Si no, crea uno nuevo (POST) — pasa a existir desde ese momento.
    async guardarConteo(datos, idExistente) {
      const token = await auth.obtenerToken();
      if (idExistente) {
        await graphFetch(`${rutaLista(CONFIG.listConteosId)}/${idExistente}/fields`, {
          token,
          method: 'PATCH',
          body: datos,
        });
        return { id: idExistente, ...datos };
      }
      const respuesta = await graphFetch(rutaLista(CONFIG.listConteosId), {
        token,
        method: 'POST',
        body: { fields: datos },
      });
      return { id: respuesta.id, ...datos };
    },

    // Borra un item puntual (se usa al quitar un producto de una posicion
    // mixta, para que el registro viejo no quede huerfano en la lista).
    async eliminarConteo(id) {
      const token = await auth.obtenerToken();
      await graphFetch(`${rutaLista(CONFIG.listConteosId)}/${id}`, { token, method: 'DELETE' });
    },

    // Historial = log append-only de cada captura (nunca se edita ni se borra),
    // para trazabilidad completa dia a dia por posicion.
    async obtenerHistorial() {
      const token = await auth.obtenerToken();
      const items = await obtenerTodosLosItems(rutaLista(CONFIG.listHistorialId), token);
      return items.map((item) => ({ id: item.id, ...item.fields }));
    },

    async crearHistorial(datos) {
      const token = await auth.obtenerToken();
      const respuesta = await graphFetch(rutaLista(CONFIG.listHistorialId), {
        token,
        method: 'POST',
        body: { fields: datos },
      });
      return { id: respuesta.id, ...datos };
    },

    async obtenerRotadores() {
      const token = await auth.obtenerToken();
      const items = await obtenerTodosLosItems(rutaLista(CONFIG.listRotadoresId), token);
      return items.map((item) => ({ id: item.id, ...item.fields }));
    },

    async crearRotador(datos) {
      const token = await auth.obtenerToken();
      const respuesta = await graphFetch(rutaLista(CONFIG.listRotadoresId), {
        token,
        method: 'POST',
        body: { fields: datos },
      });
      return { id: respuesta.id, ...datos };
    },

    // A diferencia de Conteos (historico append-only), Rotadores si se puede borrar:
    // es la plantilla de personal activo, no un registro historico.
    async eliminarRotador(id) {
      const token = await auth.obtenerToken();
      await graphFetch(`${rutaLista(CONFIG.listRotadoresId)}/${id}`, { token, method: 'DELETE' });
    },

    // Bloqueos de edicion en vivo y tiempo real todavia no estan
    // implementados contra SharePoint/Graph (quedaron solo para el modo
    // Supabase) — se dejan como no-op para que la app no se rompa.
    async obtenerBloqueos() {
      return [];
    },
    async bloquearPosicion() {},
    async liberarPosicion() {},
    suscribirseCambios() {
      return () => {};
    },
    async actualizarResultadoMacro() {},
  };
}
