import { Router } from 'express';
import { pool, tabla } from '../db.js';
import {
  exigirSesion, crearToken, cifrarClave, compararClave, claveDebil,
  minutosBloqueo, registrarFallo, registrarIngreso,
} from '../seguridad.js';
import { validarUsuario } from '../validacion.js';

export const usuariosRouter = Router();

const USUARIOS = tabla('usuarios_rotadores');

// Nunca se devuelve la contraseña (ni su hash) al cliente.
const sinPassword = (fila) => {
  if (!fila) return fila;
  const { Password, ...resto } = fila;
  return resto;
};

// POST /usuarios/login — valida en el servidor y entrega un token de sesion.
// Unica ruta de usuarios que no exige sesion.
usuariosRouter.post('/login', async (req, res) => {
  const { usuario, password } = req.body || {};
  if (!usuario || !password) return res.status(400).json({ error: 'Falta usuario o contraseña.' });
  const clave = String(usuario).trim().toLowerCase().slice(0, 60);
  const minutos = minutosBloqueo(clave);
  if (minutos) return res.status(429).json({ error: `Usuario bloqueado por varios intentos fallidos. Intenta de nuevo en ${minutos} minuto(s).` });
  try {
    const { rows } = await pool.query(
      `select * from ${USUARIOS} where lower("Usuario") = lower($1) and "Activo" = 'Si'`,
      [String(usuario).trim()]
    );
    let encontrado = null, migrar = false;
    for (const u of rows) {
      const r = compararClave(password, u.Password);
      if (r.ok) { encontrado = u; migrar = r.migrar; break; }
    }
    if (!encontrado) {
      const f = registrarFallo(clave);
      if (f.bloqueado) return res.status(429).json({ error: 'Demasiados intentos fallidos. El usuario queda bloqueado 15 minutos.' });
      return res.status(401).json({ error: `Usuario o contraseña incorrectos.${f.quedan <= 2 ? ` Te quedan ${f.quedan} intento(s).` : ''}` });
    }
    registrarIngreso(clave);
    // Contraseña vieja en texto plano: se cifra en este mismo ingreso
    if (migrar) await pool.query(`update ${USUARIOS} set "Password" = $1 where id = $2`, [cifrarClave(password), encontrado.id]);
    res.json({ ...sinPassword(encontrado), token: crearToken(encontrado) });
  } catch (err) {
    console.error('POST /usuarios/login', err);
    res.status(500).json({ error: 'No se pudo validar el usuario.' });
  }
});

// Desde aqui: solo el Admin administra cuentas.
usuariosRouter.use(exigirSesion('Admin'));

// GET /usuarios — todas las cuentas.
usuariosRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`select * from ${USUARIOS} order by "Nombre"`);
    res.json(rows.map(sinPassword));
  } catch (err) {
    console.error('GET /usuarios', err);
    res.status(500).json({ error: 'No se pudo consultar usuarios.' });
  }
});

// POST /usuarios — crea una cuenta nueva (contraseña cifrada).
usuariosRouter.post('/', async (req, res) => {
  const { datos, error } = validarUsuario(req.body, { nuevo: true });
  if (error) return res.status(422).json({ error });
  if (claveDebil(datos.Password, datos.Usuario)) return res.status(422).json({ error: 'La contraseña es muy fácil: usa al menos 8 caracteres con letras y números, distinta del usuario.' });
  datos.Password = cifrarClave(datos.Password);
  datos.Activo = datos.Activo || 'Si';
  try {
    const columnas = Object.keys(datos);
    const { rows } = await pool.query(
      `insert into ${USUARIOS} (${columnas.map((c) => `"${c}"`).join(', ')}) values (${columnas.map((_, i) => `$${i + 1}`).join(', ')}) returning *`,
      columnas.map((c) => datos[c])
    );
    console.info(`Usuario creado por ${req.sesion.usuario}: ${datos.Usuario} (${datos.Rol})`);
    res.status(201).json(sinPassword(rows[0]));
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Ese usuario ya existe.' });
    console.error('POST /usuarios', err);
    res.status(500).json({ error: 'No se pudo crear el usuario.' });
  }
});

// PATCH /usuarios/:id — cambia nombre, rol, estado o contraseña.
usuariosRouter.patch('/:id', async (req, res) => {
  const { datos, error } = validarUsuario(req.body, { nuevo: false });
  if (error) return res.status(422).json({ error });
  if (!Object.keys(datos).length) return res.status(400).json({ error: 'No se envió ningún dato.' });
  if (datos.Password !== undefined) {
    if (claveDebil(datos.Password, datos.Usuario)) return res.status(422).json({ error: 'La contraseña es muy fácil: usa al menos 8 caracteres con letras y números, distinta del usuario.' });
    datos.Password = cifrarClave(datos.Password);
  }
  // El Admin no puede quitarse a si mismo el rol ni desactivarse (evita quedar sin administrador)
  if (String(req.params.id) === String(req.sesion.id) && ((datos.Rol && datos.Rol !== 'Admin') || datos.Activo === 'No'))
    return res.status(422).json({ error: 'No puedes quitarte el rol de Admin ni desactivar tu propia cuenta.' });
  try {
    const columnas = Object.keys(datos);
    const { rows } = await pool.query(
      `update ${USUARIOS} set ${columnas.map((c, i) => `"${c}" = $${i + 1}`).join(', ')} where id = $${columnas.length + 1} returning *`,
      [...columnas.map((c) => datos[c]), req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No existe ese usuario.' });
    console.info(`Usuario modificado por ${req.sesion.usuario}: ${rows[0].Usuario} (${columnas.join(', ')})`);
    res.json(sinPassword(rows[0]));
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Ese usuario ya existe.' });
    console.error('PATCH /usuarios/:id', err);
    res.status(500).json({ error: 'No se pudo actualizar el usuario.' });
  }
});

// DELETE /usuarios/:id — la app ya lo llamaba pero la ruta no existia.
usuariosRouter.delete('/:id', async (req, res) => {
  if (String(req.params.id) === String(req.sesion.id)) return res.status(422).json({ error: 'No puedes eliminar tu propia cuenta.' });
  try {
    const { rows } = await pool.query(`delete from ${USUARIOS} where id = $1 returning "Usuario"`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No existe ese usuario.' });
    console.info(`Usuario eliminado por ${req.sesion.usuario}: ${rows[0].Usuario}`);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /usuarios/:id', err);
    res.status(500).json({ error: 'No se pudo eliminar el usuario.' });
  }
});
