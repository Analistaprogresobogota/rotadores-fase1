export function Metric({ label, value, colorVar }) {
  return (
    <div className="panel" style={{ padding: '10px 12px' }}>
      <div className="texto-sub" style={{ fontSize: 11 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          marginTop: 2,
          color: colorVar ? `var(${colorVar})` : 'var(--texto)',
        }}
      >
        {value}
      </div>
    </div>
  );
}
