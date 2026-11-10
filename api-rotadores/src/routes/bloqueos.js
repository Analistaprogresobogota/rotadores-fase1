import { Router } from 'express';
import { pool, tabla } from '../db.js';
import { cambios } from '../eventos.js';
import { exigirSesion } from '../seguridad.js';

export const bloqueosRouter = Router();

const BLOQUEOS = tabla('bloqueos_edicion');

// GET /bloqueos/eventos — SSE, igual que en conteos.js.
bloqueosRouter.get('/eventos', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.flushHeaders();
  res.write('retry: 3000\n\n');
  const avisar = () => res.write('data: cambio\n\n');
  cambios.on('bloqueos', avisar);
  const latido = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => {
    clearInterval(latido);
    cambios.off('bloqueos', avisar);
  });
});

// GET /bloqueos — bloqueos de edicion vigentes (la app ignora los que
// llevan mas de 5 minutos, esa regla la aplica el cliente).
bloqueosRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`select * from ${BLOQUEOS}`);
    res.json(rows);
  } catch (err) {
    console.error('GET /bloqueos', err);
    res.status(500).json({ error: 'No se pudo consultar bloqueos.' });
  }
});

// POST /bloqueos — crea o reemplaza el bloqueo de una posicion (upsert por Orden).
bloqueosRouter.post('/', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  const { Orden, Turno } = req.body || {};
  const Usuario = req.sesion.nombre; // el bloqueo queda a nombre de quien tiene la sesion
  if (Orden === undefined || !Number.isInteger(Number(Orden))) return res.status(422).json({ error: 'Falta Orden (número entero).' });
  try {
    const { rows } = await pool.query(
      `insert into ${BLOQUEOS} ("Orden", "Usuario", "Turno", "CreadoEn")
       values ($1, $2, $3, now())
       on conflict ("Orden") do update set "Usuario" = excluded."Usuario", "Turno" = excluded."Turno", "CreadoEn" = excluded."CreadoEn"
       returning *`,
      [Orden, Usuario, Turno]
    );
    res.status(201).json(rows[0]);
    cambios.emit('bloqueos');
  } catch (err) {
    console.error('POST /bloqueos', err);
    res.status(500).json({ error: 'No se pudo crear el bloqueo.' });
  }
});

// DELETE /bloqueos/:orden — libera la posicion (al guardar o cancelar la edicion).
bloqueosRouter.delete('/:orden', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  try {
    await pool.query(`delete from ${BLOQUEOS} where "Orden" = $1`, [req.params.orden]);
    res.status(204).end();
    cambios.emit('bloqueos');
  } catch (err) {
    console.error('DELETE /bloqueos/:orden', err);
    res.status(500).json({ error: 'No se pudo liberar la posicion.' });
  }
});
