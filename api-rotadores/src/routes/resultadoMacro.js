import { Router } from 'express';
import { pool, tabla } from '../db.js';
import { exigirSesion } from '../seguridad.js';

export const resultadoMacroRouter = Router();

const RESULTADO_MACRO = tabla('resultado_macro');

const COLUMNAS = [
  'id', 'OrdenMacro', 'Orden', 'Modulo', 'Familia', 'Codigo', 'Descripcion',
  'Estibas', 'Cajas', 'Unidades', 'FechaVencimiento', 'DiasParaVencer',
  'Estado', 'Frescura', 'AptoT1', 'AptoT2', 'AptoKA', 'TotalCajas',
  'TotalUnidades', 'Hectolitros', 'Estatus', 'Observaciones', 'Usuario',
];

// GET /resultado-macro — snapshot mas reciente (util para consultar directo
// desde la base de datos sin abrir la app).
resultadoMacroRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`select * from ${RESULTADO_MACRO} order by "OrdenMacro"`);
    res.json(rows);
  } catch (err) {
    console.error('GET /resultado-macro', err);
    res.status(500).json({ error: 'No se pudo consultar resultado_macro.' });
  }
});

// PUT /resultado-macro — reemplaza TODO el contenido con el arreglo enviado
// (la app recalcula esto en el dispositivo cada vez que algo cambia).
resultadoMacroRouter.put('/', exigirSesion('Rotador', 'Admin'), async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(422).json({ error: 'Se esperaba una lista de filas.' });
  if (req.body.length > 5000) return res.status(422).json({ error: 'Demasiadas filas.' });
  const filas = req.body;
  const cliente = await pool.connect();
  try {
    await cliente.query('begin');
    // Varios dispositivos pueden enviar esto al mismo tiempo: el candado hace que
    // esperen su turno (antes chocaban con "duplicate key" y respondian 500).
    await cliente.query("select pg_advisory_xact_lock(hashtext('resultado_macro'))");
    await cliente.query(`delete from ${RESULTADO_MACRO}`);
    const nombres = COLUMNAS.map((c) => `"${c}"`).join(', ');
    for (const fila of filas) {
      const valores = COLUMNAS.map((c) => fila[c] ?? null);
      const marcadores = COLUMNAS.map((_, i) => `$${i + 1}`).join(', ');
      await cliente.query(`insert into ${RESULTADO_MACRO} (${nombres}) values (${marcadores})`, valores);
    }
    await cliente.query('commit');
    res.status(204).end();
  } catch (err) {
    await cliente.query('rollback');
    console.error('PUT /resultado-macro', err);
    res.status(500).json({ error: 'No se pudo actualizar resultado_macro.' });
  } finally {
    cliente.release();
  }
});
