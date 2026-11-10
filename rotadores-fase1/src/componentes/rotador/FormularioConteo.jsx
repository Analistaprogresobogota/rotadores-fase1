import { BuscadorSku } from './BuscadorSku';
import { CampoFecha } from './CampoFecha';

// Un bloque de FormularioConteo = un producto dentro de la posicion. Cuando
// el modulo es mixto (2+ productos distintos guardados ahi), se repite este
// mismo bloque una vez por producto — ver "Añadir producto" en VistaRotador.
export function FormularioConteo({ idPrefijo, linea, actualizar, skus, onQuitar }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="campo" style={{ gridColumn: '1 / -1' }}>
        <label className="campo-label" htmlFor={`${idPrefijo}-codigo`}>
          Código o nombre del producto
        </label>
        <BuscadorSku skus={skus} onSeleccionar={(codigo) => actualizar('Codigo', codigo || '')} />
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor={`${idPrefijo}-estibas`}>
          Estibas
        </label>
        <input
          id={`${idPrefijo}-estibas`}
          type="number"
          min="0"
          inputMode="numeric"
          className="campo-input"
          value={linea.Estibas}
          onChange={(e) => actualizar('Estibas', e.target.value)}
          placeholder="0"
        />
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor={`${idPrefijo}-cajas`}>
          Cajas
        </label>
        <input
          id={`${idPrefijo}-cajas`}
          type="number"
          min="0"
          inputMode="numeric"
          className="campo-input"
          value={linea.Cajas}
          onChange={(e) => actualizar('Cajas', e.target.value)}
        />
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor={`${idPrefijo}-unidades`}>
          Unidades
        </label>
        <input
          id={`${idPrefijo}-unidades`}
          type="number"
          min="0"
          inputMode="numeric"
          className="campo-input"
          value={linea.Unidades}
          onChange={(e) => actualizar('Unidades', e.target.value)}
        />
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor={`${idPrefijo}-vencimiento`}>
          Fecha de vencimiento
        </label>
        <CampoFecha
          id={`${idPrefijo}-vencimiento`}
          valor={linea.FechaVencimiento}
          onCambiar={(iso) => actualizar('FechaVencimiento', iso)}
        />
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor={`${idPrefijo}-estatus`}>
          Estatus
        </label>
        <input
          id={`${idPrefijo}-estatus`}
          className="campo-input"
          value={linea.Estatus}
          onChange={(e) => actualizar('Estatus', e.target.value)}
          placeholder="Ej. ENVASE, SALDO ND, RETENIDO…"
        />
      </div>

      <div className="campo" style={{ gridColumn: '1 / -1' }}>
        <label className="campo-label" htmlFor={`${idPrefijo}-observaciones`}>
          Observaciones
        </label>
        <textarea
          id={`${idPrefijo}-observaciones`}
          className="campo-input"
          style={{ minHeight: 70, resize: 'vertical' }}
          value={linea.Observaciones}
          onChange={(e) => actualizar('Observaciones', e.target.value)}
          placeholder="Ej. estibas en buen estado, caja húmeda, etc. (opcional)"
        />
      </div>

      <div className="campo" style={{ gridColumn: '1 / -1' }}>
        <label
          htmlFor={`${idPrefijo}-bloquear`}
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <input
            id={`${idPrefijo}-bloquear`}
            type="checkbox"
            checked={linea.Bloquear === 'Bloquear'}
            onChange={(e) => actualizar('Bloquear', e.target.checked ? 'Bloquear' : 'No')}
          />
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            Bloquear este producto (retenido, no apto para despacho)
          </span>
        </label>
      </div>

      {onQuitar && (
        <button
          type="button"
          className="boton-secundario"
          style={{ gridColumn: '1 / -1', justifySelf: 'start' }}
          onClick={onQuitar}
        >
          Quitar este producto
        </button>
      )}
    </div>
  );
}
