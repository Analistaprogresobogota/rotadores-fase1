import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool, tabla, SCHEMA } from './db.js';
import { conteosRouter } from './routes/conteos.js';
import { historialRouter } from './routes/historial.js';
import { bloqueosRouter } from './routes/bloqueos.js';
import { resultadoMacroRouter } from './routes/resultadoMacro.js';
import { usuariosRouter } from './routes/usuarios.js';
import { exigirSesion } from './seguridad.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN?.split(',') }));
app.use(express.json({ limit: '10mb' }));
// Errores de JSON mal formado: respuesta clara en vez de un 500
app.use((err, req, res, next) => (err.type === 'entity.parse.failed' ? res.status(400).json({ error: 'JSON no válido.' }) : next(err)));

// El endpoint de salud valida dos cosas: que Postgres responde, y que el
// esquema "progreso" es realmente el que la API esta usando — un simple
// "select 1" puede pasar aunque las consultas reales fallen por apuntar al
// esquema equivocado (ver informe tecnico de Tecnologia).
app.get('/salud', async (req, res) => {
  try {
    const { rows } = await pool.query(`select count(*)::int as total from ${tabla('conteos')}`);
    res.json({ estado: 'ok', base_de_datos: 'conectada', esquema: SCHEMA, conteos_en_esquema: rows[0].total });
  } catch (err) {
    console.error('GET /salud', err);
    res.status(500).json({ estado: 'error', esquema: SCHEMA });
  }
});

// Toda ruta de datos exige sesion (token del login). Cada router agrega el
// rol que puede escribir. /salud y /usuarios/login son las unicas abiertas.
app.use('/conteos', exigirSesion(), conteosRouter);
app.use('/historial', exigirSesion(), historialRouter);
app.use('/bloqueos', exigirSesion(), bloqueosRouter);
app.use('/resultado-macro', exigirSesion(), resultadoMacroRouter);
app.use('/usuarios', usuariosRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`API de Rotadores escuchando en el puerto ${PORT} (esquema: ${SCHEMA})`);
});
