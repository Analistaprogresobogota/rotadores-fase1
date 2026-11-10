import { Router } from 'express';
import { pool, tabla } from '../db.js';
import { cambios } from '../eventos.js';
import { exigirSesion } from '../seguridad.js';
import { validarConteo, COLUMNAS_CONTEO } from '../validacion.js';

export const historialRouter = Router();

const HISTORIAL = tabla('historial');

// GET /historial/eventos — SSE, igual que en conteos.js. Va antes de las
// demas rutas para que no choque con ningun otro parametro.
historialRouter.get('/eventos', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.flushHeaders();
  res.write('retry: 3000\n\n');
  const avisar = () => res.write('data: cambio\n\n');
  cambios.on('historial', avisar);
  const latido = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => {
    clearInterval(latido);
    cambios.off('historial', avisar);
  });
});

const COLUMNAS = COLUMNAS_CONTEO;

// GET /historial — log completo, mas reciente primero. Nunca se edita ni
// se borra (append-only), por eso no hay PATCH ni DELETE aqui.
historialRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`select * from ${HISTORIAL} order by "FechaToma" desc`);
    res.json(rows);
  } catch (err) {
    console.error('GET /historial', err);
    res.status(500).json({ error: 'No se pudo consultar historial.' });
  }
});

// POST /historial — agrega una fila nueva (una por cada vez que se guarda un conteo).
historialRouter.post('/', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  const { datos, error } = validarConteo(req.body, req.sesion);
  if (error) return res.status(422).json({ error });
  try {
    const columnas = COLUMNAS.filter((c) => datos[c] !== undefined);
    const valores = columnas.map((c) => datos[c]);
    const nombres = columnas.map((c) => `"${c}"`).join(', ');
    const marcadores = columnas.map((_, i) => `$${i + 1}`).join(', ');
    const { rows } = await pool.query(`insert into ${HISTORIAL} (${nombres}) values (${marcadores}) returning *`, valores);
    res.status(201).json(rows[0]);
    cambios.emit('historial');
  } catch (err) {
    console.error('POST /historial', err);
    res.status(500).json({ error: 'No se pudo crear la fila de historial.' });
  }
});
