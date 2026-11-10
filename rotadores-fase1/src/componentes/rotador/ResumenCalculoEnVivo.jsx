import { Metric } from '../comunes/Metric';
import { COLOR_ESTADO } from '../../logica/macro';

export function ResumenCalculoEnVivo({ calc }) {
  return (
    <div className="panel-suave" style={{ padding: 16 }}>
      <div className="texto-sub" style={{ fontSize: 12, marginBottom: 10, fontWeight: 600 }}>
        CÁLCULO EN VIVO
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 10 }}>
        <Metric label="Días p/ vencer" value={calc.diasParaVencer} />
        <Metric label="Estado" value={calc.estado} colorVar={COLOR_ESTADO[calc.estado]} />
        <Metric label="Frescura" value={calc.frescura} />
        <Metric label="APTO T1" value={calc.aptoT1} colorVar={calc.aptoT1 === 'Sí' ? '--ok' : '--bad'} />
        <Metric label="APTO T2" value={calc.aptoT2} colorVar={calc.aptoT2 === 'Sí' ? '--ok' : '--bad'} />
        <Metric label="APTO KA" value={calc.aptoKA} colorVar={calc.aptoKA === 'Sí' ? '--ok' : '--bad'} />
        <Metric label="Total cajas" value={calc.totalCajas} />
        <Metric label="Total unidades" value={calc.totalUnidades} />
        <Metric label="Hectolitros" value={calc.hectolitros} />
      </div>
    </div>
  );
}
