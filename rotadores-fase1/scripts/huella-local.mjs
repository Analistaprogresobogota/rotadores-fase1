// Genera la huella (ClaveHash) de una contraseña para usuariosLocales.local.js (modo local).
// Uso: node scripts/huella-local.mjs <usuario> <clave>
import crypto from 'node:crypto';
const [usuario, clave] = process.argv.slice(2);
if (!usuario || !clave) { console.error('Uso: node scripts/huella-local.mjs <usuario> <clave>'); process.exit(1); }
console.log(crypto.createHash('sha256').update(`rotadores:${usuario.trim().toLowerCase()}:${clave}`).digest('hex'));
