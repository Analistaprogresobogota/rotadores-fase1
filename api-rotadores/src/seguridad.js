// Seguridad de la API: sesiones firmadas, contraseñas cifradas, permisos por
// rol y bloqueo por intentos fallidos. Solo usa el modulo "crypto" de Node
// (sin dependencias nuevas).
import 'dotenv/config';
import crypto from 'node:crypto';

export const ROLES = ['Admin', 'Supervisor', 'Programador', 'Rotador'];

// ---------- Secreto para firmar sesiones ----------
// Obligatorio y largo: sin el, la API no arranca (nunca un valor por defecto).
const SECRETO = process.env.AUTH_SECRET || '';
if (SECRETO.length < 32) {
  console.error('Falta AUTH_SECRET (minimo 32 caracteres) en el .env. La API no arranca sin el. Ver .env.example.');
  process.exit(1);
}
const HORAS_SESION = Number(process.env.SESION_HORAS || 12); // cubre un turno completo de 8 h con margen

const b64 = (buf) => Buffer.from(buf).toString('base64url');

// Token = base64url(datos).base64url(HMAC-SHA256). Los datos no son secretos
// (id, usuario, nombre, rol, vencimiento); la firma impide alterarlos.
export function crearToken(usuario) {
  const datos = b64(JSON.stringify({
    id: usuario.id, usuario: usuario.Usuario, nombre: usuario.Nombre, rol: usuario.Rol,
    exp: Date.now() + HORAS_SESION * 3600 * 1000,
  }));
  const firma = b64(crypto.createHmac('sha256', SECRETO).update(datos).digest());
  return `${datos}.${firma}`;
}

export function leerToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [datos, firma] = token.split('.');
  const esperada = b64(crypto.createHmac('sha256', SECRETO).update(datos).digest());
  const a = Buffer.from(firma || ''), b = Buffer.from(esperada);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const s = JSON.parse(Buffer.from(datos, 'base64url').toString());
    return s.exp > Date.now() && ROLES.includes(s.rol) ? s : null;
  } catch {
    return null;
  }
}

// ---------- Middleware: exige sesion y, si se indican, ciertos roles ----------
// El token llega en "Authorization: Bearer ...". Solo los flujos de eventos
// (EventSource no permite cabeceras) lo aceptan en ?token=.
export function exigirSesion(...roles) {
  return (req, res, next) => {
    const cabecera = req.get('authorization') || '';
    const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7)
      : req.path.endsWith('/eventos') ? req.query.token : null;
    const sesion = leerToken(token);
    if (!sesion) return res.status(401).json({ error: 'sesion' });
    if (roles.length && !roles.includes(sesion.rol)) {
      console.warn(`Acceso denegado: ${sesion.usuario} (${sesion.rol}) -> ${req.method} ${req.baseUrl}${req.path}`);
      return res.status(403).json({ error: 'Tu rol no tiene permiso para esta acción.' });
    }
    req.sesion = sesion;
    next();
  };
}

// ---------- Contraseñas ----------
// Formato guardado: scrypt$<sal hex>$<hash hex>. Las contraseñas viejas en
// texto plano se aceptan UNA vez y se cifran en ese mismo ingreso.
export const MARCA_SIN_CLAVE = '__ASIGNAR_CLAVE__';

export function cifrarClave(clave) {
  const sal = crypto.randomBytes(16);
  const hash = crypto.scryptSync(String(clave), sal, 64);
  return `scrypt$${sal.toString('hex')}$${hash.toString('hex')}`;
}

export function compararClave(clave, guardada) {
  if (!guardada || guardada === MARCA_SIN_CLAVE) return { ok: false };
  if (guardada.startsWith('scrypt$')) {
    const [, sal, hash] = guardada.split('$');
    const calculado = crypto.scryptSync(String(clave), Buffer.from(sal, 'hex'), 64);
    const esperado = Buffer.from(hash, 'hex');
    return { ok: esperado.length === calculado.length && crypto.timingSafeEqual(calculado, esperado) };
  }
  const a = Buffer.from(String(clave)), b = Buffer.from(String(guardada));
  return { ok: a.length === b.length && crypto.timingSafeEqual(a, b), migrar: true };
}

// Clave aceptable: 8+ caracteres, con letras y numeros, no comun, distinta del usuario
const COMUNES = ['12345678', 'password', 'contraseña', 'rotadores', 'qwerty123', 'abc12345'];
export function claveDebil(clave, usuario = '') {
  const c = String(clave || '').toLowerCase();
  return c.length < 8 || !/\p{L}/u.test(c) || !/\d/.test(c) || COMUNES.includes(c) || c === String(usuario).toLowerCase();
}

// ---------- Bloqueo por intentos fallidos (en memoria) ----------
// 5 fallos en 15 min bloquean el usuario 15 min. Cuenta aunque el usuario no
// exista, para no revelar cuales existen. Limite conocido: es por proceso.
const MAX_FALLOS = 5, VENTANA_MS = 15 * 60 * 1000, BLOQUEO_MS = 15 * 60 * 1000;
const intentos = new Map();

export function minutosBloqueo(usuario) {
  const r = intentos.get(usuario);
  return r?.hasta > Date.now() ? Math.ceil((r.hasta - Date.now()) / 60000) : 0;
}
export function registrarFallo(usuario) {
  const ahora = Date.now();
  const r = intentos.get(usuario);
  const fallos = r && ahora - r.ultimo < VENTANA_MS ? r.fallos + 1 : 1;
  if (fallos >= MAX_FALLOS) {
    intentos.set(usuario, { fallos: 0, ultimo: ahora, hasta: ahora + BLOQUEO_MS });
    console.warn(`Usuario bloqueado por intentos fallidos: ${usuario}`);
    return { quedan: 0, bloqueado: true };
  }
  intentos.set(usuario, { fallos, ultimo: ahora, hasta: 0 });
  return { quedan: MAX_FALLOS - fallos, bloqueado: false };
}
export function registrarIngreso(usuario) { intentos.delete(usuario); }
