// Copia este archivo como usuariosLocales.local.js para usar el modo local (VITE_MODO_LOCAL=si).
// usuariosLocales.local.js está en .gitignore. Las contraseñas van como huella SHA-256 (ClaveHash),
// nunca en texto. Genera la huella con:  node scripts/huella-local.mjs <usuario> <clave>
export default [
  { id: 'u-admin', Nombre: 'Administrador', Usuario: 'admin', ClaveHash: '<huella generada>', Rol: 'Admin', Activo: 'Si' },
];
