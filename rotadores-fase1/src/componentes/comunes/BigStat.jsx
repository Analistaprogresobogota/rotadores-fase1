import { formatoPorcentaje } from '../../utilidades/formato';

export function BigStat({ label, valor, total, colorVar }) {
  return (
    <div className="panel" style={{ textAlign: 'center' }}>
      <div className="texto-sub" style={{ fontSize: 12, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: `var(${colorVar})`, marginTop: 4 }}>
        {valor}
        <span className="texto-sub" style={{ fontSize: 15, fontWeight: 500 }}>
          /{total}
        </span>
      </div>
      <div className="texto-sub" style={{ fontSize: 11 }}>
        {formatoPorcentaje(valor, total)}% del inventario
      </div>
    </div>
  );
}
