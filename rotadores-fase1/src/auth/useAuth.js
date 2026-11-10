import { useContext } from 'react';
import { MsalContext } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { loginRequest } from './msalConfig';

// Lee el contexto de MSAL directamente (en vez de useMsal()) porque este hook
// puede llamarse tambien cuando la app corre solo en modo demo, sin
// MsalProviderApp montado (CONFIG_COMPLETA=false) — en ese caso no hay
// contexto y esta funcion debe devolver un auth "vacio" en vez de lanzar error.
//
// Se usa loginRedirect (no loginPopup): dentro del WebView de Capacitor en
// Android, window.open() suele estar bloqueado o ser inestable, mientras
// que el redirect completo funciona de forma confiable.
export function useAuth() {
  const contexto = useContext(MsalContext);
  const instance = contexto?.instance;
  const cuenta = contexto?.accounts?.[0] || null;

  async function obtenerTokenGraph() {
    if (!instance || !cuenta) throw new Error('No hay sesión activa');
    try {
      const resultado = await instance.acquireTokenSilent({ ...loginRequest, account: cuenta });
      return resultado.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(loginRequest);
      }
      throw error;
    }
  }

  const login = () => instance?.loginRedirect(loginRequest);
  const logout = () => instance?.logoutRedirect();

  return { login, logout, cuenta, obtenerTokenGraph };
}
