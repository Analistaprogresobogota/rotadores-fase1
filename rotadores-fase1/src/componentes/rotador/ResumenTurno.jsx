import { useMemo, useState } from 'react';
import { TablaCruda } from '../comunes/TablaCruda';
import { SectionTitle } from '../comunes/SectionTitle';

// Pantalla final al terminar turno: solo el Histórico (log completo,
// append-only). El estado actual (Conteos) y el Resultado de la macro ya se
// ven en vivo mientras se captura (BuscadorPosiciones) — aquí solo queda
// cerrar la sesión viendo el registro completo de lo que se hizo.
export function ResumenTurno({ historial, skus, onFinalizar }) {
  const [texto, setTexto] = useState('');

  const historialFiltrado = useMemo(() => {
    const q = texto.trim().toLowerCase();
    return q ? historial.filter((f) => f.Modulo?.toLowerCase().includes(q)) : historial;
  }, [historial, texto]);

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <SectionTitle
        icono="🏁"
        titulo="Turno terminado"
        sub="Histórico completo de lo capturado (nunca se edita ni se borra)."
      />

      <input
        className="campo-input"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Filtrar por módulo…"
      />

      <TablaCruda filas={historialFiltrado} skus={skus} />

      <button className="boton boton-primario" onClick={onFinalizar}>
        Salir
      </button>
    </div>
  );
}
