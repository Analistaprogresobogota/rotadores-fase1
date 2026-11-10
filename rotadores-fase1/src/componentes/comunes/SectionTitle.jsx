export function SectionTitle({ icono, titulo, sub }) {
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span aria-hidden="true">{icono}</span>
        {titulo}
      </div>
      {sub && (
        <div className="texto-sub" style={{ fontSize: 13, marginTop: 3 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
