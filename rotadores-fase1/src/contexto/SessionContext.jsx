import { createContext, useMemo, useState } from 'react';

export const SessionContext = createContext(null);

const SESION_VACIA = { modo: null, rol: null, usuario: null, id: null, turno: null };

// Estado global de sesion: modo ('demo' | 'real'), rol ('Rotador' |
// 'Supervisor' | 'Programador' | 'Admin'), nombre del usuario activo (y su
// id de cuenta), y turno elegido por el rotador ('Mañana' | 'Tarde' |
// 'Noche'). Vive solo en memoria (no persiste entre recargas a proposito).
export function SessionProvider({ children }) {
  const [sesion, setSesion] = useState(SESION_VACIA);

  const valor = useMemo(
    () => ({
      ...sesion,
      // Login unificado (usuario+password contra la tabla usuarios_rotadores,
      // ver usuariosProveedor.js) — el usuarioRow ya trae el Rol, asi que no
      // hace falta elegirlo antes de entrar.
      entrar: (usuarioRow) =>
        setSesion({ modo: 'demo', rol: usuarioRow.Rol, usuario: usuarioRow.Nombre, id: usuarioRow.id, turno: null }),
      entrarReal: (rol, usuario) => setSesion({ modo: 'real', rol, usuario, id: null, turno: null }),
      elegirTurno: (turno) => setSesion((s) => ({ ...s, turno })),
      salir: () => setSesion(SESION_VACIA),
    }),
    [sesion]
  );

  return <SessionContext.Provider value={valor}>{children}</SessionContext.Provider>;
}
