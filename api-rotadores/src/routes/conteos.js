import { Router } from 'express';
import { pool, tabla } from '../db.js';
import { cambios } from '../eventos.js';
import { exigirSesion } from '../seguridad.js';
import { validarConteo, COLUMNAS_CONTEO } from '../validacion.js';

export const conteosRouter = Router();

const CONTEOS = tabla('conteos');

const COLUMNAS = COLUMNAS_CONTEO;

// GET /conteos/eventos — Server-Sent Events, reemplaza el tiempo real de
// Supabase para esta tabla. Va antes de "/:id" para que no choque la ruta.
conteosRouter.get('/eventos', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.flushHeaders();
  res.write('retry: 3000\n\n');
  const avisar = () => res.write('data: cambio\n\n');
  cambios.on('conteos', avisar);
  const latido = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => {
    clearInterval(latido);
    cambios.off('conteos', avisar);
  });
});

// GET /conteos — estado actual de todas las posiciones.
conteosRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`select * from ${CONTEOS}`);
    res.json(rows);
  } catch (err) {
    console.error('GET /conteos', err);
    res.status(500).json({ error: 'No se pudo consultar conteos.' });
  }
});

// POST /conteos — crea un conteo nuevo para una posicion.
conteosRouter.post('/', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  const { datos, error } = validarConteo(req.body, req.sesion);
  if (error) return res.status(422).json({ error });
  try {
    const columnas = COLUMNAS.filter((c) => datos[c] !== undefined);
    const valores = columnas.map((c) => datos[c]);
    const nombres = columnas.map((c) => `"${c}"`).join(', ');
    const marcadores = columnas.map((_, i) => `$${i + 1}`).join(', ');
    const { rows } = await pool.query(`insert into ${CONTEOS} (${nombres}) values (${marcadores}) returning *`, valores);
    res.status(201).json(rows[0]);
    cambios.emit('conteos');
  } catch (err) {
    console.error('POST /conteos', err);
    res.status(500).json({ error: 'No se pudo crear el conteo.' });
  }
});

// PATCH /conteos/:id — edita un conteo existente (confirmar/editar posicion).
conteosRouter.patch('/:id', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  const { datos, error } = validarConteo(req.body, req.sesion, { parcial: true });
  if (error) return res.status(422).json({ error });
  try {
    const columnas = COLUMNAS.filter((c) => datos[c] !== undefined);
    const asignaciones = columnas.map((c, i) => `"${c}" = $${i + 1}`).join(', ');
    const valores = columnas.map((c) => datos[c]);
    const { rows } = await pool.query(
      `update ${CONTEOS} set ${asignaciones} where id = $${columnas.length + 1} returning *`,
      [...valores, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No existe ese conteo.' });
    res.json(rows[0]);
    cambios.emit('conteos');
  } catch (err) {
    console.error('PATCH /conteos/:id', err);
    res.status(500).json({ error: 'No se pudo actualizar el conteo.' });
  }
});

// DELETE /conteos/:id — borra un conteo puntual. Se usa cuando en una
// posicion mixta (2+ productos guardados ahi) se quita uno de los productos:
// sin esta ruta, el registro viejo quedaba huerfano en la base para siempre
// (nunca se actualizaba ni se borraba), inflando el conteo real de filas.
conteosRouter.delete('/:id', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  try {
    const { rowCount } = await pool.query(`delete from ${CONTEOS} where id = $1`, [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'No existe ese conteo.' });
    res.status(204).end();
    cambios.emit('conteos');
  } catch (err) {
    console.error('DELETE /conteos/:id', err);
    res.status(500).json({ error: 'No se pudo borrar el conteo.' });
  }
});
