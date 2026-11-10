import { SessionProvider } from './contexto/SessionContext';
import { useSession } from './contexto/useSession';
import { alVencerSesion, borrarToken } from './datos/tokenSesion';
import { useAuth } from './auth/useAuth';
import { useTema } from './hooks/useTema';
import { MsalProviderApp } from './auth/MsalProviderApp';
import { CONFIG_COMPLETA } from './config';
import { useEffect, useState } from 'react';
import { TopBar } from './componentes/comunes/TopBar';
import { MenuLateral } from './componentes/comunes/MenuLateral';
import { MENU_ROLES, TITULOS } from './componentes/comunes/menuRoles';
import { VistaLogin } from './componentes/login/VistaLogin';
import { VistaRotador } from './componentes/rotador/VistaRotador';
import { VistaSupervisor } from './componentes/supervisor/VistaSupervisor';
import { VistaProgramador } from './componentes/programador/VistaProgramador';
import { VistaAdmin } from './componentes/admin/VistaAdmin';

export default function App() {
  // MsalProviderApp solo se monta si hay configuracion real de Entra/SharePoint:
  // evita instanciar MSAL con un clientId invalido cuando solo se usara el modo demo.
  if (CONFIG_COMPLETA) {
    return (
      <MsalProviderApp>
        <SessionProvider>
          <Contenido />
        </SessionProvider>
      </MsalProviderApp>
    );
  }
  return (
    <SessionProvider>
      <Contenido />
    </SessionProvider>
  );
}

function Contenido() {
  const { modo, rol, usuario, salir } = useSession();
  const { logout } = useAuth();
  const { tema, alternar } = useTema();
  const [seccion, setSeccion] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Al entrar (o cambiar de rol) se abre el primer módulo de su menú.
  useEffect(() => {
    setSeccion(rol ? MENU_ROLES[rol]?.[0]?.id || null : null);
  }, [rol, usuario]);

  // Si la API dice que la sesión venció, se vuelve al login (lo pendiente queda en cola)
  useEffect(() => alVencerSesion(() => { salir(); alert('Tu sesión venció. Vuelve a iniciar sesión; lo que no alcanzó a guardarse se enviará al entrar.'); }), [salir]);

  if (!modo || !rol) return <VistaLogin />;
  const actual = seccion || MENU_ROLES[rol]?.[0]?.id;

  function cerrarSesion() {
    borrarToken();
    salir();
    if (modo === 'real') logout();
  }

  return (
    <div className="app-shell app-con-menu">
      <MenuLateral
        rol={rol}
        usuario={usuario}
        seccion={actual}
        onSeccion={setSeccion}
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
        onSalir={cerrarSesion}
      />
      <div className="app-principal">
        <TopBar titulo={TITULOS[actual] || ''} rol={rol} tema={tema} alternarTema={alternar} onMenu={() => setMenuAbierto(true)} />
        <div className="app-contenido">
          {rol === 'Rotador' ? (
            <VistaRotador seccion={actual} />
          ) : rol === 'Programador' ? (
            <VistaProgramador seccion={actual} />
          ) : rol === 'Admin' ? (
            <VistaAdmin seccion={actual} />
          ) : (
            <VistaSupervisor seccion={actual} />
          )}
        </div>
      </div>
    </div>
  );
}
