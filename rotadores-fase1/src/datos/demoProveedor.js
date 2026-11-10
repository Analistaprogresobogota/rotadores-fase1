import { ROTADORES_DEMO_INICIALES } from './datosDemo';
import { CONTEOS_ACTUALES_DEMO } from './conteosActualesDemo';
import { SKUS_DEMO } from './skusDemo';
import { MODULOS_DEMO } from './modulosDemo';
import { leerLocal, guardarLocal } from '../utilidades/almacenLocal';

// Estado del modo local: arranca con los datos reales embebidos (Excel) y
// guarda lo que se capture en el navegador, para que sobreviva a recargas.
// conteos = estado ACTUAL de cada posicion (un item por Modulo/Orden).
// historial = log append-only de cada captura, nunca se edita ni se borra.
const CLAVE = 'rotadores-datos-v1';
const guardado = leerLocal(CLAVE, null);
let conteos = guardado?.conteos || [...CONTEOS_ACTUALES_DEMO];
let historial = guardado?.historial || [];
let rotadores = guardado?.rotadores || [...ROTADORES_DEMO_INICIALES];
let bloqueos = [];
function persistir() {
  guardarLocal(CLAVE, { conteos, historial, rotadores });
}

// Skus y Modulos van embebidos como modulos JS (ver skusDemo.js/modulosDemo.js),
// no se descargan por fetch: asi la app funciona abierta como archivo local
// (file://) sin servidor, con doble clic sobre el .html.
function retrasoSimulado() {
  return new Promise((resolve) => setTimeout(resolve, 200));
}

export function crearDemoProveedor() {
  return {
    async obtenerSkus() {
      await retrasoSimulado();
      return SKUS_DEMO;
    },

    async obtenerModulos() {
      await retrasoSimulado();
      return MODULOS_DEMO;
    },

    async obtenerConteos() {
      await retrasoSimulado();
      return conteos;
    },

    async obtenerHistorial() {
      await retrasoSimulado();
      return historial;
    },

    async guardarConteo(datos, idExistente) {
      await retrasoSimulado();
      if (idExistente) {
        const actualizado = { id: idExistente, ...datos };
        conteos = conteos.map((c) => (c.id === idExistente ? actualizado : c));
        persistir();
        return actualizado;
      }
      const nuevo = { id: `demo-${Date.now()}`, ...datos };
      conteos = [...conteos, nuevo];
      persistir();
      return nuevo;
    },

    // Borra un conteo puntual (se usa al quitar un producto de una posicion
    // mixta, para que el registro viejo no quede huerfano).
    async eliminarConteo(id) {
      await retrasoSimulado();
      conteos = conteos.filter((c) => c.id !== id);
      persistir();
    },

    async crearHistorial(datos) {
      await retrasoSimulado();
      const nuevo = { id: `hist-${Date.now()}`, ...datos };
      historial = [nuevo, ...historial];
      persistir();
      return nuevo;
    },

    async obtenerRotadores() {
      await retrasoSimulado();
      return rotadores;
    },

    async crearRotador(datos) {
      await retrasoSimulado();
      const nuevo = { id: `rot-${Date.now()}`, Activo: 'Si', ...datos };
      rotadores = [...rotadores, nuevo];
      persistir();
      return nuevo;
    },

    async eliminarRotador(id) {
      await retrasoSimulado();
      rotadores = rotadores.filter((r) => r.id !== id);
      persistir();
    },

    // En modo demo solo hay un dispositivo, asi que los bloqueos de edicion
    // y el tiempo real no aplican de verdad, pero se implementan igual para
    // que el resto de la app (multi-rotador) funcione sin condicionales.
    async obtenerBloqueos() {
      await retrasoSimulado();
      return bloqueos;
    },
    async bloquearPosicion(orden, usuarioActual, turno) {
      await retrasoSimulado();
      bloqueos = [
        ...bloqueos.filter((b) => b.Orden !== orden),
        { Orden: orden, Usuario: usuarioActual, Turno: turno, CreadoEn: new Date().toISOString() },
      ];
    },
    async liberarPosicion(orden) {
      await retrasoSimulado();
      bloqueos = bloqueos.filter((b) => b.Orden !== orden);
    },
    suscribirseCambios() {
      return () => {};
    },
    async actualizarResultadoMacro() {},
  };
}
