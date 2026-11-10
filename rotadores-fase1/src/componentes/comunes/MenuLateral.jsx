import isotipoIm from '../../marca/isotipo-im-blanco.svg';
import { MENU_ROLES } from './menuRoles';

const NOMBRE_ROL = { Admin: 'Admin · Progreso' };

export function MenuLateral({ rol, usuario, seccion, onSeccion, abierto, onCerrar, onSalir }) {
  const items = MENU_ROLES[rol] || [];
  return (
    <>
      <aside className={`menu-lateral${abierto ? ' abierto' : ''}`}>
        <div className="menu-marca">
          <img src={isotipoIm} alt="IM Ingeniería" />
          <div>
            <strong>Rotadores<span>.</span></strong>
            <small>IM Ingeniería · Tocancipá</small>
          </div>
        </div>
        <nav className="menu-nav">
          <p className="menu-seccion">Módulos</p>
          {items.map((it) => (
            <button
              key={it.id}
              className={`menu-item${seccion === it.id ? ' activo' : ''}`}
              onClick={() => {
                onSeccion(it.id);
                onCerrar();
              }}
            >
              <span className="menu-ico" aria-hidden="true">{it.ico}</span>
              {it.texto}
            </button>
          ))}
        </nav>
        <div className="menu-usuario">
          <div>
            <strong>{usuario}</strong>
            <small>{NOMBRE_ROL[rol] || rol}</small>
          </div>
          <button className="menu-salir" onClick={onSalir}>Salir</button>
        </div>
      </aside>
      {abierto && <div className="menu-velo" onClick={onCerrar} aria-hidden="true" />}
    </>
  );
}
