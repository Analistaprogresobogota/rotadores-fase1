import { useContext, useEffect, useState } from 'react';
import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../../datos/usuariosProveedor';
import { SessionContext } from '../../contexto/SessionContext';
import { SectionTitle } from '../comunes/SectionTitle';
import { Cargando } from '../comunes/Cargando';
import { ErrorAviso } from '../comunes/ErrorAviso';
import { Empty } from '../comunes/Empty';
import { ActualizarConteosExcel } from './ActualizarConteosExcel';

const VACIO = { Nombre: '', Usuario: '', Password: '', Rol: 'Rotador' };

export function VistaUsuarios() {
  const sesion = useContext(SessionContext);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(VACIO);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

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
