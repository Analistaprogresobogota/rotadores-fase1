import { CONFIG } from '../config';

export const msalConfig = {
  auth: {
    clientId: CONFIG.clientId,
    authority: `https://login.microsoftonline.com/${CONFIG.tenantId}`,
    redirectUri: window.location.origin + window.location.pathname,
  },
  cache: {
    // localStorage (no sessionStorage) para que la sesion persista dentro
    // del WebView de Capacitor entre cierres de la app.
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

// Sites.ReadWrite.All: necesario porque la app escribe (POST) en la lista Conteos.
// User.Read: para mostrar el nombre de la cuenta autenticada.
export const loginRequest = {
  scopes: ['Sites.ReadWrite.All', 'User.Read'],
};
