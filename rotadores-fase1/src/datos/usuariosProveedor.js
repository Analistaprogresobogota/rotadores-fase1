// Login y administracion de cuentas (tabla "usuarios_rotadores"). El login
// funciona offline: si no hay red, se valida contra la ultima copia de
// "usuarios_rotadores" que quedo en cache.
//
// Backend: usa api-rotadores (VITE_API_URL) si esta configurada, si no cae
// a Supabase (comportamiento original), si no trabaja solo con cache local.
import { createClient } from '@supabase/supabase-js';
import { CONFIG, USAR_API } from '../config';
import { leerCache, escribirCache } from './colaSincronizacion';
import { cabeceraSesion, avisarSesionVencida, guardarToken } from './tokenSesion';
import { MODO_LOCAL } from '../config';
import { leerLocal, guardarLocal } from '../utilidades/almacenLocal';

// Modo local (prototipo publicado): cuentas guardadas en el navegador, con las
// mismas cuentas de la app real (scripts/seed-usuarios.mjs + datosDemo.js).
const CLAVE_USUARIOS = 'rotadores-usuarios-v1';
// Las cuentas del modo local NO van en el código: se leen de src/datos/usuariosLocales.local.js
// (archivo fuera de Git, ver usuariosLocales.ejemplo.js). Si no existe, el modo local no tiene cuentas.
const ARCHIVO_LOCAL = Object.values(import.meta.glob('./usuariosLocales.local.js', { eager: true }))[0];
const USUARIOS_LOCALES = ARCHIVO_LOCAL?.default || [];
const usuariosLocales = () => leerLocal(CLAVE_USUARIOS, USUARIOS_LOCALES);
const guardarUsuariosLocales = (lista) => guardarLocal(CLAVE_USUARIOS, lista);

// En el modo local la contraseña nunca se guarda en texto: solo su huella
// SHA-256 (con el usuario como sal). Las cuentas viejas guardadas en el
// navegador con "Password" en texto se aceptan y se convierten al entrar.
async function huellaLocal(usuario, clave) {
  const datos = new TextEncoder().encode(`rotadores:${normaliza(usuario)}:${clave}`);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
async function sinClaveEnTexto(registro) {
  if (registro.Password === undefined) return registro;
  const { Password, ...resto } = registro;
  return { ...resto, ClaveHash: await huellaLocal(registro.Usuario, Password) };
}

const TABLA = 'usuarios_rotadores';

let cliente = null;
function obtenerCliente() {
  if (!CONFIG.supabaseUrl || !CONFIG.supabaseAnonKey) return null;
  if (!cliente) cliente = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
  return cliente;
}

async function solicitud(ruta, opciones = {}) {
  const resp = await fetch(`${CONFIG.apiUrl}${ruta}`, {
    ...opciones,
    headers: { 'Content-Type': 'application/json', ...cabeceraSesion() },
  });
  if (!resp.ok) {
    const cuerpo = await resp.json().catch(() => ({}));
    if (resp.status === 401 && !ruta.endsWith('/login')) avisarSesionVencida();
    const error = new Error(cuerpo.error || `api-rotadores respondio ${resp.status}`);
    error.status = resp.status;
    throw error;
  }
  if (resp.status === 204) return null;
  return resp.json();
}

function normaliza(u) {
  return (u || '').trim().toLowerCase();
}

export async function listarUsuarios() {
  if (MODO_LOCAL) return usuariosLocales().map(({ Password: _clave, ClaveHash: _huella, ...c }) => c).sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  if (USAR_API) {
    try {
      const data = await solicitud('/usuarios');
      escribirCache(TABLA, data);
      return data;
    } catch {
      return leerCache(TABLA);
    }
  }
  const supabase = obtenerCliente();
  if (supabase) {
    try {
      const { data, error } = await supabase.from(TABLA).select('*').order('Nombre');
      if (error) throw error;
      escribirCache(TABLA, data);
      return data;
    } catch {
      return leerCache(TABLA);
    }
  }
  return leerCache(TABLA);
}

export async function login(usuario, password) {
  const u = normaliza(usuario);

  if (MODO_LOCAL) {
    const huella = await huellaLocal(u, password);
    const lista = usuariosLocales();
    const encontrado = lista.find((x) => normaliza(x.Usuario) === u && x.Activo !== 'No' && (x.ClaveHash === huella || (x.Password !== undefined && x.Password === password)));
    if (!encontrado) return null;
    if (encontrado.Password !== undefined) guardarUsuariosLocales(await Promise.all(lista.map((x) => (x.id === encontrado.id ? sinClaveEnTexto(x) : x))));
    const { Password: _clave, ClaveHash: _huella, ...cuenta } = encontrado;
    return cuenta;
  }

  if (USAR_API) {
    try {
      // La validacion pasa por el servidor: a diferencia de Supabase, aqui
      // nunca se trae la lista completa de contraseñas al dispositivo.
      const encontrado = await solicitud('/usuarios/login', { method: 'POST', body: JSON.stringify({ usuario: u, password }) });
      if (!encontrado) return null;
      const { token, ...cuenta } = encontrado;
      guardarToken(token);
      return cuenta;
    } catch (err) {
      if (err.status === 401) return null; // usuario o contraseña incorrectos
      if (err.status === 429) { err.mensajeUsuario = err.message; throw err; } // bloqueado por intentos
      // sin red: con la API no se puede entrar sin conexión (la cache no guarda contraseñas)
      if (!err.status) { const e = new Error('Sin conexión con el servidor.'); e.mensajeUsuario = 'Sin conexión con el servidor. Revisa la red e intenta de nuevo.'; throw e; }
      throw err;
    }
  } else {
    const supabase = obtenerCliente();
    if (supabase) {
      try {
        const { data, error } = await supabase.from(TABLA).select('*').eq('Activo', 'Si');
        if (error) throw error;
        escribirCache(TABLA, data);
        const encontrado = data.find((x) => normaliza(x.Usuario) === u && x.Password === password);
        return encontrado || null;
      } catch {
        // sin red: sigue con la cache de abajo
      }
    }
  }

  const cache = leerCache(TABLA);
  const encontrado = cache.find((x) => normaliza(x.Usuario) === u && x.Password === password && x.Activo !== 'No');
  return encontrado || null;
}

export async function crearUsuario(datos) {
  const registro = { Nombre: datos.Nombre, Usuario: datos.Usuario, Password: datos.Password, Rol: datos.Rol, Activo: 'Si' };
  if (MODO_LOCAL) {
    const lista = usuariosLocales();
    if (lista.some((x) => normaliza(x.Usuario) === normaliza(registro.Usuario))) throw new Error('Ese usuario ya existe.');
    const nuevo = await sinClaveEnTexto({ id: `u-${Date.now()}`, ...registro });
    guardarUsuariosLocales([...lista, nuevo]);
    const { ClaveHash: _huella, ...cuenta } = nuevo;
    return cuenta;
  }
  if (USAR_API) return solicitud('/usuarios', { method: 'POST', body: JSON.stringify(registro) });
  const supabase = obtenerCliente();
  if (!supabase) throw new Error('No hay backend configurado (ni API ni Supabase).');
  const { data, error } = await supabase.from(TABLA).insert(registro).select().single();
  if (error) throw error;
  return data;
}

export async function actualizarUsuario(id, cambios) {
  if (MODO_LOCAL) {
    const lista = await Promise.all(usuariosLocales().map((x) => (x.id === id ? sinClaveEnTexto({ ...x, ...cambios }) : x)));
    guardarUsuariosLocales(lista);
    const { Password: _clave, ClaveHash: _huella, ...cuenta } = lista.find((x) => x.id === id) || {};
    return cuenta;
  }
  if (USAR_API) return solicitud(`/usuarios/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) });
  const supabase = obtenerCliente();
  if (!supabase) throw new Error('No hay backend configurado (ni API ni Supabase).');
  const { data, error } = await supabase.from(TABLA).update(cambios).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function eliminarUsuario(id) {
  if (MODO_LOCAL) {
    guardarUsuariosLocales(usuariosLocales().filter((x) => x.id !== id));
    return null;
  }
  if (USAR_API) return solicitud(`/usuarios/${id}`, { method: 'DELETE' });
  const supabase = obtenerCliente();
  if (!supabase) throw new Error('No hay backend configurado (ni API ni Supabase).');
  const { error } = await supabase.from(TABLA).delete().eq('id', id);
  if (error) throw error;
  return null;
}
