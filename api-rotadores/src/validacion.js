// Validacion del lado del servidor: la app ya valida, pero la API no confia
// en el cliente. Devuelve { datos } limpio o { error } con un mensaje claro.
import { ROLES } from './seguridad.js';

export const COLUMNAS_CONTEO = [
  'Orden', 'Modulo', 'Codigo', 'Estibas', 'Cajas', 'Unidades',
  'FechaVencimiento', 'Estatus', 'Observaciones', 'Bloquear',
  'Usuario', 'Rol', 'Turno', 'FechaToma', 'Sede',
];
const NUMERICAS = ['Estibas', 'Cajas', 'Unidades'];
const MAX_TEXTO = 500;

const esFecha = (v) => {
  if (!/^\d{4}-\d{2}-\d{2}/.test(v)) return false;
  const d = new Date(v.slice(0, 10) + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v.slice(0, 10);
};

// Conteo / fila de historial. "parcial" = PATCH (solo valida lo que llega).
export function validarConteo(cuerpo, sesion, { parcial = false } = {}) {
  if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) return { error: 'Datos no válidos.' };
  const datos = {};
  for (const c of COLUMNAS_CONTEO) if (cuerpo[c] !== undefined) datos[c] = cuerpo[c];
  if (!Object.keys(datos).length) return { error: 'No se envió ningún dato.' };

  if (!parcial && (datos.Orden === undefined || datos.Orden === null || datos.Orden === '')) return { error: 'Falta la posición (Orden).' };
  if (datos.Orden !== undefined && !Number.isInteger(Number(datos.Orden))) return { error: 'La posición (Orden) debe ser un número entero.' };
  for (const c of NUMERICAS) {
    if (datos[c] === undefined || datos[c] === null || datos[c] === '') continue;
    const n = Number(datos[c]);
    if (!Number.isFinite(n) || n < 0) return { error: `${c} debe ser un número mayor o igual a 0.` };
  }
  if (datos.FechaVencimiento && !esFecha(String(datos.FechaVencimiento))) return { error: 'La fecha de vencimiento no es válida.' };
  for (const [c, v] of Object.entries(datos)) {
    if (v !== null && typeof v === 'object') return { error: `El campo ${c} no es válido.` };
    if (typeof v === 'string' && v.length > MAX_TEXTO) return { error: `El campo ${c} es demasiado largo (máximo ${MAX_TEXTO}).` };
  }
  // Un rotador solo registra a su propio nombre; el Admin puede cargar conteos de otros (actualización desde Excel)
  if (sesion.rol === 'Rotador') { datos.Usuario = sesion.nombre; datos.Rol = 'Rotador'; }
  return { datos };
}

// Cuentas de usuario
const RE_USUARIO = /^[A-Za-z0-9._-]{2,40}$/;
export function validarUsuario(cuerpo, { nuevo }) {
  if (!cuerpo || typeof cuerpo !== 'object') return { error: 'Datos no válidos.' };
  const datos = {};
  for (const c of ['Nombre', 'Usuario', 'Password', 'Rol', 'Activo']) if (cuerpo[c] !== undefined) datos[c] = cuerpo[c];
  if (nuevo) for (const c of ['Nombre', 'Usuario', 'Password', 'Rol']) if (!String(datos[c] ?? '').trim()) return { error: `Falta: ${c}.` };
  if (datos.Usuario !== undefined && !RE_USUARIO.test(String(datos.Usuario).trim())) return { error: 'Usuario: de 2 a 40 letras, números, punto, guion o guion bajo.' };
  if (datos.Nombre !== undefined && String(datos.Nombre).trim().length < 3) return { error: 'Escribe el nombre completo.' };
  if (datos.Rol !== undefined && !ROLES.includes(datos.Rol)) return { error: 'Rol no válido.' };
  if (datos.Activo !== undefined && !['Si', 'No'].includes(datos.Activo)) return { error: 'Activo debe ser Si o No.' };
  if (datos.Usuario !== undefined) datos.Usuario = String(datos.Usuario).trim();
  if (datos.Nombre !== undefined) datos.Nombre = String(datos.Nombre).trim();
  return { datos };
}
