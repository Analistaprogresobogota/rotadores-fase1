import { useState } from 'react';
import { useSession } from '../../contexto/useSession';
import { useAuth } from '../../auth/useAuth';
import { CONFIG_COMPLETA } from '../../config';
import { login } from '../../datos/usuariosProveedor';
import logoIm from '../../marca/logo-im-ingenieria-blanco.svg';

export function VistaLogin() {
  const { entrar } = useSession();
  const { login: loginMsal } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const puedeEntrar = Boolean(usuario.trim() && password) && !cargando;

  async function intentarEntrar() {
    if (!puedeEntrar) return;
    setCargando(true);
    setError(null);
    try {
      const encontrado = await login(usuario, password);
      if (!encontrado) {
        setError('Usuario o contraseña incorrectos.');
        return;
      }
      entrar(encontrado);
    } catch (e) {
      setError(e?.mensajeUsuario || 'No se pudo validar el usuario. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-im">
      <div className="vidrio login-tarjeta">
        <img className="login-logo" src={logoIm} alt="IM Ingeniería" />
        <div>
          <div className="login-fase">PLANTA TOCANCIPÁ</div>
          <h1 className="login-nombre">
            Rotadores<span>.</span>
          </h1>
          <p className="login-lema">Índice de frescura y rotación de producto</p>
        </div>

        {error && <div className="aviso-error">{error}</div>}
        <div className="campo">
          <label className="campo-label" htmlFor="login-usuario">
            Usuario
          </label>
          <input
            id="login-usuario"
            className="campo-input"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setError(null);
            }}
            autoComplete="username"
            autoCapitalize="none"
          />
        </div>
        <div className="campo">
          <label className="campo-label" htmlFor="login-password">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            className="campo-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && intentarEntrar()}
            autoComplete="current-password"
          />
        </div>

        <button className="boton-amarillo" disabled={!puedeEntrar} onClick={intentarEntrar}>
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>

        {CONFIG_COMPLETA && (
          <>
            <div className="login-separador">
              <i />
              <span>o</span>
              <i />
            </div>
            <button className="boton-secundario" style={{ width: '100%' }} onClick={loginMsal}>
              Entrar con cuenta corporativa
            </button>
          </>
        )}

        <p className="login-pie">© {new Date().getFullYear()} IM Ingeniería en manualidades &amp; logística</p>
      </div>

      <div className="login-chips" aria-hidden="true">
        <div className="vidrio login-frase">
          <span className="frase-ico">◷</span>
          <p>Cada posición <b>cuenta.</b></p>
        </div>
        <div className="vidrio login-frase">
          <span className="frase-ico">✦</span>
          <p>Lo que rota hoy, <b>no vence mañana.</b></p>
        </div>
      </div>

      <p className="login-credito">Creado por: SAMUEL TORRES</p>
    </div>
  );
}
