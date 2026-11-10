import { useMemo } from 'react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './msalConfig';

// Solo se monta cuando CONFIG_COMPLETA es verdadero (ver src/config.js):
// en modo demo no hace falta instanciar MSAL con un clientId invalido.
export function MsalProviderApp({ children }) {
  const instanciaMsal = useMemo(() => {
    const instancia = new PublicClientApplication(msalConfig);
    instancia.addEventCallback((evento) => {
      if (evento.eventType === EventType.LOGIN_SUCCESS && evento.payload.account) {
        instancia.setActiveAccount(evento.payload.account);
      }
    });
    return instancia;
  }, []);

  return <MsalProvider instance={instanciaMsal}>{children}</MsalProvider>;
}
