import { turnoActual } from '../../utilidades/turnos';

function IconoSol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}

function IconoLuna() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
    </svg>
  );
}

// Barra superior: título del módulo, turno (rotador) y botón de tema arriba a la derecha.
export function TopBar({ titulo, rol, tema, alternarTema, onMenu }) {
  const oscuro = tema === 'oscuro';
  return (
    <header className="barra-im">
      <button className="boton-hamburguesa" onClick={onMenu} aria-label="Abrir menú">☰</button>
      <h1 className="barra-titulo">{titulo}</h1>
      {rol === 'Rotador' && <span className="turno-chip turno-chip-barra">Turno {turnoActual().nombre}</span>}
      <button
        className="boton-tema"
        onClick={alternarTema}
        aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        <span className="tema-ico">{oscuro ? <IconoSol /> : <IconoLuna />}</span>
        <span className="tema-txt">{oscuro ? 'Tema claro' : 'Tema oscuro'}</span>
      </button>
    </header>
  );
}
