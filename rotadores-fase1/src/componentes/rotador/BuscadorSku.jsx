import { useState } from 'react';

// Combobox que busca un SKU por Codigo O por Descripcion a la vez (a veces
// el rotador solo sabe el nombre del producto, ej. "aguila", no el codigo).
export function BuscadorSku({ skus, onSeleccionar, valorInicial }) {
  const [texto, setTexto] = useState(valorInicial || '');
  const [mostrar, setMostrar] = useState(false);

  const q = texto.trim().toLowerCase();
  const sugerencias = q
    ? skus.filter((s) => s.Codigo.toLowerCase().includes(q) || s.Descripcion.toLowerCase().includes(q)).slice(0, 8)
    : [];

  function elegir(sku) {
    setTexto(`${sku.Codigo} — ${sku.Descripcion}`);
    setMostrar(false);
    onSeleccionar(sku.Codigo);
  }

  function cambiarTexto(valor) {
    setTexto(valor);
    onSeleccionar(null);
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="campo-input"
        value={texto}
        onChange={(e) => cambiarTexto(e.target.value)}
        onFocus={() => setMostrar(true)}
        onBlur={() => setMostrar(false)}
        placeholder="Código o nombre, ej. 14603 o águila"
      />
      {mostrar && sugerencias.length > 0 && (
        <div
          className="panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 10,
            padding: 6,
            display: 'grid',
            gap: 2,
            maxHeight: 260,
            overflowY: 'auto',
          }}
        >
          {sugerencias.map((s, i) => (
            <button
              key={`${s.Codigo}-${i}`}
              className="boton-secundario"
              style={{ textAlign: 'left', border: 'none', width: '100%' }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => elegir(s)}
            >
              <strong>{s.Codigo}</strong> <span className="texto-sub">— {s.Descripcion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
