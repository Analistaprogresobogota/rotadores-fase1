import { useContext, useEffect, useState } from 'react';
import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../../datos/usuariosProveedor';
import { SessionContext } from '../../contexto/SessionContext';
import { SectionTitle } from '../comunes/SectionTitle';
import { Cargando } from '../comunes/Cargando';
import { ErrorAviso } from '../comunes/ErrorAviso';
import { Empty } from '../comunes/Empty';
import { ActualizarConteosExcel } from './ActualizarConteosExcel';

const VACIO = { Nombre: '', Usuario: '', Password: '', Rol: 'Rotador' };

// Misma regla que la API (api-rotadores/src/seguridad.js): también aplica en el modo local, que no tiene servidor
const MSG_CLAVE = 'La contraseña es muy fácil: usa al menos 8 caracteres con letras y números, distinta del usuario.';
function claveDebil(clave, usuario) {
  const c = String(clave || '').toLowerCase();
  return c.length < 8 || !/\p{L}/u.test(c) || !/\d/.test(c) || c === String(usuario || '').toLowerCase();
}

// Clave sugerida al cambiar una contraseña: 8+ caracteres con letras y números (ej. Rt4821-kmpw)
function generarClave() {
  const letras = 'abcdefghjkmnpqrstuvwxyz';
  const n = new Uint32Array(8);
  crypto.getRandomValues(n);
  return 'Rt' + [0, 1, 2, 3].map((i) => n[i] % 10).join('') + '-' + [4, 5, 6, 7].map((i) => letras[n[i] % letras.length]).join('');
}

export function VistaUsuarios() {
  const sesion = useContext(SessionContext);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(VACIO);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [claveNueva, setClaveNueva] = useState(null); // { nombre, usuario, clave }: se muestra una sola vez

  async function recargar() {
    setUsuarios(await listarUsuarios());
    setCargando(false);
  }

  useEffect(() => {
    recargar();
  }, []);

  const puedeCrear = Boolean(form.Nombre.trim() && form.Usuario.trim() && form.Password.trim()) && !guardando;

  async function crear(e) {
    e.preventDefault();
    if (!puedeCrear) return;
    if (claveDebil(form.Password.trim(), form.Usuario.trim())) { setError(MSG_CLAVE); return; }
    setGuardando(true);
    setError(null);
    try {
      await crearUsuario({
        Nombre: form.Nombre.trim(),
        Usuario: form.Usuario.trim(),
        Password: form.Password.trim(),
        Rol: form.Rol,
      });
      setForm(VACIO);
      recargar();
    } catch (err) {
      // El servidor explica el motivo (clave muy fácil, usuario repetido, dato inválido…)
      setError(err.message?.includes('duplicate') ? 'Ese usuario ya existe.' : err.message || 'No se pudo crear la cuenta.');
    } finally {
      setGuardando(false);
    }
  }

  async function cambiarRol(u, Rol) {
    await actualizarUsuario(u.id, { Rol });
    recargar();
  }

  async function alternarActivo(u) {
    await actualizarUsuario(u.id, { Activo: u.Activo === 'No' ? 'Si' : 'No' });
    recargar();
  }

  async function cambiarClave(u) {
    const clave = window.prompt(`Nueva contraseña para ${u.Nombre} (${u.Usuario}).\nMínimo 8 caracteres con letras y números. Puedes dejar la sugerida o escribir otra:`, generarClave());
    if (clave == null) return;
    setError(null);
    setClaveNueva(null);
    if (claveDebil(clave.trim(), u.Usuario)) { setError(MSG_CLAVE); return; }
    try {
      await actualizarUsuario(u.id, { Usuario: u.Usuario, Password: clave.trim() });
      setClaveNueva({ nombre: u.Nombre, usuario: u.Usuario, clave: clave.trim() });
    } catch (err) {
      setError(err.message || 'No se pudo cambiar la contraseña.');
    }
  }

  async function eliminar(u) {
    if (u.id === sesion?.id) return;
    if (!window.confirm(`¿Eliminar la cuenta de ${u.Nombre} (${u.Usuario})? Esta acción no se puede deshacer.`)) return;
    setError(null);
    try {
      await eliminarUsuario(u.id);
      recargar();
    } catch (err) {
      setError(err.message || 'No se pudo eliminar la cuenta.');
    }
  }

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <SectionTitle icono="👥" titulo="Usuarios" sub="Cualquier persona que necesite entrar a la app (Rotador, Supervisor, Programador o Admin) necesita una cuenta aquí." />

      <ErrorAviso mensaje={error} />

      {claveNueva && (
        <div className="panel" role="status" style={{ display: 'grid', gap: 8 }}>
          <strong>Contraseña cambiada: {claveNueva.nombre} ({claveNueva.usuario})</strong>
          <code style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5 }}>{claveNueva.clave}</code>
          <span className="texto-sub">Entrégala a la persona por un canal privado: se guarda cifrada y no se vuelve a mostrar.</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="boton-secundario" onClick={() => navigator.clipboard?.writeText(claveNueva.clave)}>Copiar</button>
            <button className="boton-secundario" onClick={() => setClaveNueva(null)}>Listo</button>
          </div>
        </div>
      )}

      <form onSubmit={crear} className="panel form-usuarios">
        <div className="campo">
          <label className="campo-label" htmlFor="us-nombre">
            Nombre completo
          </label>
          <input id="us-nombre" className="campo-input" value={form.Nombre} onChange={(e) => setForm((f) => ({ ...f, Nombre: e.target.value }))} placeholder="Nombre y apellido" />
        </div>
        <div className="campo">
          <label className="campo-label" htmlFor="us-usuario">
            Usuario (login)
          </label>
          <input id="us-usuario" className="campo-input" value={form.Usuario} onChange={(e) => setForm((f) => ({ ...f, Usuario: e.target.value }))} placeholder="ej. jperez" autoCapitalize="none" />
        </div>
        <div className="campo">
          <label className="campo-label" htmlFor="us-password">
            Contraseña
          </label>
          <input id="us-password" className="campo-input" value={form.Password} onChange={(e) => setForm((f) => ({ ...f, Password: e.target.value }))} placeholder="Contraseña" />
        </div>
        <div className="campo">
          <label className="campo-label" htmlFor="us-rol">
            Rol
          </label>
          <select id="us-rol" className="campo-input" value={form.Rol} onChange={(e) => setForm((f) => ({ ...f, Rol: e.target.value }))}>
            <option value="Rotador">Rotador</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Programador">Programador</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button className="boton boton-primario" type="submit" disabled={!puedeCrear}>
          {guardando ? 'Creando…' : 'Crear usuario'}
        </button>
      </form>
      <div className="texto-sub" style={{ fontSize: 11, marginTop: -8 }}>
        La contraseña se guarda cifrada: nadie puede verla después. Usa al menos 8 caracteres con letras y números.
      </div>

      {cargando ? (
        <Cargando texto="Cargando usuarios…" />
      ) : usuarios.length === 0 ? (
        <Empty texto="Todavía no hay usuarios creados." />
      ) : (
        <div className="tabla-envoltorio">
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} style={{ opacity: u.Activo === 'No' ? 0.5 : 1 }}>
                  <td>{u.Nombre}</td>
                  <td>{u.Usuario}</td>
                  <td>
                    <select className="campo-input" value={u.Rol} onChange={(e) => cambiarRol(u, e.target.value)}>
                      <option value="Rotador">Rotador</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Programador">Programador</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>{u.Activo === 'No' ? 'Inactivo' : 'Activo'}</td>
                  <td className="acciones-usuario">
                    <button className="boton-secundario" onClick={() => cambiarClave(u)}>
                      Cambiar contraseña
                    </button>
                    <button className="boton-secundario" onClick={() => alternarActivo(u)}>
                      {u.Activo === 'No' ? 'Activar' : 'Desactivar'}
                    </button>
                    {u.id !== sesion?.id && (
                      <button className="boton-secundario boton-eliminar" onClick={() => eliminar(u)}>
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ActualizarConteosExcel />
    </div>
  );
}
