import { SectionTitle } from '../comunes/SectionTitle';

const TURNOS = [
  { valor: 'Mañana', icono: '🌅' },
  { valor: 'Tarde', icono: '🌇' },
  { valor: 'Noche', icono: '🌙' },
];

export function SelectorTurno({ onElegir }) {
  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <SectionTitle icono="⏱️" titulo="¿Qué turno vas a hacer?" sub="Se usa para saber qué posiciones ya revisaste hoy." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {TURNOS.map((t) => (
          <button key={t.valor} className="boton-opcion" onClick={() => onElegir(t.valor)}>
            <div style={{ fontSize: 22, marginBottom: 4 }} aria-hidden="true">
              {t.icono}
            </div>
            {t.valor}
          </button>
        ))}
      </div>
    </div>
  );
}
