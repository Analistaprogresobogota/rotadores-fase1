import { useEffect, useState } from 'react';

const CLAVE = 'rotadores-tema';

function temaInicial() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === 'claro' || guardado === 'oscuro') return guardado;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}

// Maneja el tema claro/oscuro con variables CSS + atributo data-theme.
// Respeta prefers-color-scheme como valor inicial y persiste la eleccion manual.
export function useTema() {
  const [tema, setTema] = useState(temaInicial);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem(CLAVE, tema);
  }, [tema]);

  const alternar = () => setTema((t) => (t === 'oscuro' ? 'claro' : 'oscuro'));

  return { tema, alternar };
}
