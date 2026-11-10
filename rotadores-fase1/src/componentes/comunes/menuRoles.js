// Módulos que ve cada rol en el menú lateral (mismo esquema que Trazza).
export const MENU_ROLES = {
  Rotador: [
    { id: 'buscar', ico: '⌕', texto: 'Buscar posición' },
    { id: 'conteos', ico: '▤', texto: 'Conteos' },
    { id: 'mprot', ico: '◷', texto: 'Mapa de rotación' },
  ],
  Supervisor: [
    { id: 'tablero', ico: '▣', texto: 'Tablero' },
    { id: 'historial', ico: '≡', texto: 'Historial' },
  ],
  Programador: [
    { id: 'conteos', ico: '▤', texto: 'Conteos' },
    { id: 'realizados', ico: '✓', texto: 'Conteos realizados' },
  ],
  // Admin = Progreso: ve todo y además administra usuarios.
  Admin: [
    { id: 'tablero', ico: '▣', texto: 'Tablero' },
    { id: 'conteos', ico: '▤', texto: 'Conteos' },
    { id: 'realizados', ico: '✓', texto: 'Conteos realizados' },
    { id: 'historial', ico: '≡', texto: 'Historial' },
    { id: 'mprot', ico: '◷', texto: 'Mapa de rotación' },
    { id: 'usuarios', ico: '☷', texto: 'Usuarios' },
  ],
};

export const TITULOS = {
  buscar: 'Buscar posición', conteos: 'Conteos', mprot: 'Mapa de rotación', tablero: 'Tablero',
  historial: 'Historial', realizados: 'Conteos realizados', usuarios: 'Usuarios',
};
