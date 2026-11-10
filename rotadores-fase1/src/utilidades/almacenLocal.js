// Persistencia simple en el navegador para el prototipo publicado (sin base
// de datos en línea): cada dispositivo guarda sus capturas en localStorage.
export function leerLocal(clave, porDefecto) {
  try {
    const v = JSON.parse(localStorage.getItem(clave));
    return v ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

export function guardarLocal(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // sin espacio o bloqueado: la app sigue funcionando en memoria
  }
}
