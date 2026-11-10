// Token de sesion que entrega api-rotadores al iniciar sesion. Vive solo en
// memoria (igual que la sesion: al recargar la pagina hay que volver a entrar).
let token = null;
const alVencer = new Set();

export const guardarToken = (t) => { token = t || null; };
export const obtenerToken = () => token;
export const borrarToken = () => { token = null; };

// Cabecera Authorization para las llamadas a la API
export const cabeceraSesion = () => (token ? { Authorization: `Bearer ${token}` } : {});

// La API respondio 401 (sesion vencida o no valida): se avisa a la app para
// que vuelva al login. Lo que no se guardo queda en la cola y se envia al volver a entrar.
export function avisarSesionVencida() {
  if (!token) return;
  token = null;
  alVencer.forEach((cb) => cb());
}
export function alVencerSesion(cb) {
  alVencer.add(cb);
  return () => alVencer.delete(cb);
}
