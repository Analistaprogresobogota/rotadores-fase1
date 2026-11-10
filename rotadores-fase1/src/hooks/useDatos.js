import { useCallback, useMemo, useState } from 'react';
import { useSession } from '../contexto/useSession';
import { useAuth } from '../auth/useAuth';
import { crearProveedorDatos } from '../datos/proveedorDatos';

function mensajeErrorEspanol(error) {
  if (error?.name === 'InteractionRequiredAuthError') {
    return 'Tu sesión expiró. Vuelve a iniciar sesión.';
  }
  if (error?.message?.includes('Failed to fetch')) {
    return 'No hay conexión a internet. Verifica la red e intenta de nuevo.';
  }
  return 'Ocurrió un error al comunicarse con SharePoint. Intenta de nuevo.';
}

// Hook consumido por las vistas: expone obtenerSkus/obtenerConteos/guardarConteo/crearHistorial
// contra el proveedor correcto (demo o Graph) segun el modo de la sesion activa,
// junto con estados de carga y error en español.
export function useDatos() {
  const { modo } = useSession();
  const { obtenerTokenGraph } = useAuth();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const proveedor = useMemo(
    () => crearProveedorDatos(modo, { obtenerToken: obtenerTokenGraph }),
    [modo, obtenerTokenGraph]
  );

  const ejecutar = useCallback(async (fn) => {
    setCargando(true);
    setError(null);
    try {
      return await fn();
    } catch (e) {
      setError(mensajeErrorEspanol(e));
      throw e;
    } finally {
      setCargando(false);
    }
  }, []);

  return {
    cargando,
    error,
    obtenerSkus: useCallback(() => ejecutar(() => proveedor.obtenerSkus()), [ejecutar, proveedor]),
    obtenerModulos: useCallback(() => ejecutar(() => proveedor.obtenerModulos()), [ejecutar, proveedor]),
    obtenerConteos: useCallback(() => ejecutar(() => proveedor.obtenerConteos()), [ejecutar, proveedor]),
    guardarConteo: useCallback(
      (datos, idExistente) => ejecutar(() => proveedor.guardarConteo(datos, idExistente)),
      [ejecutar, proveedor]
    ),
    eliminarConteo: useCallback((id) => ejecutar(() => proveedor.eliminarConteo(id)), [ejecutar, proveedor]),
    obtenerHistorial: useCallback(() => ejecutar(() => proveedor.obtenerHistorial()), [ejecutar, proveedor]),
    crearHistorial: useCallback((datos) => ejecutar(() => proveedor.crearHistorial(datos)), [ejecutar, proveedor]),
    obtenerRotadores: useCallback(() => ejecutar(() => proveedor.obtenerRotadores()), [ejecutar, proveedor]),
    crearRotador: useCallback((datos) => ejecutar(() => proveedor.crearRotador(datos)), [ejecutar, proveedor]),
    eliminarRotador: useCallback((id) => ejecutar(() => proveedor.eliminarRotador(id)), [ejecutar, proveedor]),
    obtenerBloqueos: useCallback(() => ejecutar(() => proveedor.obtenerBloqueos()), [ejecutar, proveedor]),
    bloquearPosicion: useCallback(
      (orden, usuarioActual, turno) => proveedor.bloquearPosicion(orden, usuarioActual, turno),
      [proveedor]
    ),
    liberarPosicion: useCallback((orden) => proveedor.liberarPosicion(orden), [proveedor]),
    actualizarResultadoMacro: useCallback((filas) => proveedor.actualizarResultadoMacro(filas), [proveedor]),
    // No pasa por `ejecutar`: es una suscripcion de larga duracion, no una
    // llamada puntual, asi que no debe mover los estados de cargando/error.
    suscribirseCambios: useCallback((callback) => proveedor.suscribirseCambios(callback), [proveedor]),
  };
}
