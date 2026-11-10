// Asigna (o restablece) la contraseña de un usuario, guardándola cifrada.
// Uso, desde la carpeta api-rotadores y con el .env configurado:
//   node scripts/asignar-clave.mjs <usuario>
// Genera una contraseña segura, la guarda cifrada y la muestra UNA sola vez
// para entregarla a la persona. No se registra en ningún log.
import crypto from 'node:crypto';
import { pool, tabla } from '../src/db.js';
import { cifrarClave } from '../src/seguridad.js';

const usuario = process.argv[2];
if (!usuario) {
  console.error('Uso: node scripts/asignar-clave.mjs <usuario>');
  process.exit(1);
}

const letras = 'abcdefghjkmnpqrstuvwxyz';
const azar = crypto.randomBytes(8);
const clave = 'Rt' + [0, 1, 2, 3].map((i) => azar[i] % 10).join('') + '-' + [4, 5, 6, 7].map((i) => letras[azar[i] % letras.length]).join('');

try {
  const { rows } = await pool.query(
    `update ${tabla('usuarios_rotadores')} set "Password" = $1 where lower("Usuario") = lower($2) returning "Usuario", "Nombre", "Rol"`,
    [cifrarClave(clave), usuario]
  );
  if (!rows.length) {
    console.error(`No existe el usuario "${usuario}".`);
    process.exitCode = 1;
  } else {
    console.log(`Contraseña asignada a ${rows[0].Usuario} (${rows[0].Nombre}, ${rows[0].Rol}): ${clave}`);
    console.log('Entrégala por un canal privado; no se vuelve a mostrar.');
  }
} finally {
  await pool.end();
}
