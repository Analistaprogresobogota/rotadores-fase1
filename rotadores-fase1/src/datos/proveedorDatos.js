import { crearDemoProveedor } from './demoProveedor';
import { crearGraphProveedor } from './graphProveedor';
import { crearSupabaseProveedor } from './supabaseProveedor';
import { crearApiProveedor } from './apiProveedor';
import { USAR_SUPABASE, USAR_API } from '../config';

/**
 * Devuelve un proveedor de datos con forma uniforme:
 * { obtenerSkus(), obtenerConteos(), guardarConteo(datos, idExistente), crearHistorial(datos) }
 * sin importar si el modo es 'demo' o 'real'.
 *
 * En modo 'demo', el orden de prioridad es: api-rotadores (VITE_API_URL,
 * la API propia que habla con la base de datos de Tecnologia) > Supabase
 * (ver config.js/USAR_SUPABASE) > proveedor en memoria, para no romper el
 * piloto mientras Tecnologia no tenga esa API desplegada.
 *
 * @param {'demo'|'real'} modo
 * @param {{obtenerToken: () => Promise<string>}} [auth] requerido solo en modo 'real'
 */
export function crearProveedorDatos(modo, auth) {
  if (modo === 'demo') {
    if (USAR_API) return crearApiProveedor();
    return USAR_SUPABASE ? crearSupabaseProveedor() : crearDemoProveedor();
  }
  return crearGraphProveedor(auth);
}
