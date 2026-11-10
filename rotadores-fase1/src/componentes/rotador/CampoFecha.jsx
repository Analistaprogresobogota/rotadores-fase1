import { useState } from 'react';
import { formatoFechaLarga } from '../../utilidades/fechas';

function soloDigitos(texto) {
  return texto.replace(/\D/g, '').slice(0, 8);
}

function enmascarar(digitos) {
  let texto = digitos.slice(0, 2);
  if (digitos.length > 2) texto += '/' + digitos.slice(2, 4);
  if (digitos.length > 4) texto += '/' + digitos.slice(4, 8);
  return texto;
}

// A partir de los digitos DDMMAAAA, arma la fecha ISO (YYYY-MM-DD) si es una
// fecha real (valida dias por mes, no solo rangos sueltos).
function aFechaISO(digitos) {
  if (digitos.length < 8) return null;
  const dia = Number(digitos.slice(0, 2));
  const mes = Number(digitos.slice(2, 4));
  const anio = Number(digitos.slice(4, 8));
  if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return null;
  const fecha = new Date(anio, mes - 1, dia);
  if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes - 1 || fecha.getDate() !== dia) return null;
  return `${String(anio).padStart(4, '0')}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function deFechaISOaDigitos(iso) {
  if (!iso) return '';
  const [anio, mes, dia] = iso.split('-');
  return `${dia}${mes}${anio}`;
}

// Campo de fecha para escribir a mano (mas rapido que el selector nativo en
// tablet): el usuario solo teclea numeros, la app va poniendo las barras
// solita, y abajo muestra la fecha ya interpretada para que la confirme.
export function CampoFecha({ id, valor, onCambiar }) {
  // El valor inicial (ej. al abrir "Editar" con datos existentes) se toma
  // una sola vez, al montar. De ahi en adelante `texto` manda: no hay que
  // re-sincronizar desde `valor` en cada tecla, porque mientras la fecha
  // esta incompleta `onCambiar` sube '' al padre, y sincronizar de vuelta
  // borraria lo que la persona esta escribiendo.
  const [texto, setTexto] = useState(() => enmascarar(deFechaISOaDigitos(valor)));

  function manejarCambio(e) {
    const digitos = soloDigitos(e.target.value);
    setTexto(enmascarar(digitos));
    onCambiar(aFechaISO(digitos) || '');
  }

  const digitosActuales = soloDigitos(texto);
  const iso = aFechaISO(digitosActuales);
  const completo = digitosActuales.length === 8;

  return (
    <div>
      <input
        id={id}
        className="campo-input"
        value={texto}
        onChange={manejarCambio}
        placeholder="DD/MM/AAAA"
        inputMode="numeric"
        maxLength={10}
      />
      <div
        className="texto-sub"
        style={{ fontSize: 12, marginTop: 6, color: completo && !iso ? 'var(--bad)' : undefined }}
      >
        {!digitosActuales.length
          ? 'Escribe el día, mes y año seguidos'
          : iso
            ? `→ ${formatoFechaLarga(iso)}`
            : completo
              ? 'Esa fecha no existe, revísala'
              : 'Sigue escribiendo…'}
      </div>
    </div>
  );
}
