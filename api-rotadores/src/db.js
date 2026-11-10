import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Azure Database for PostgreSQL exige SSL. "rejectUnauthorized: false" evita
// tener que instalar el certificado raiz de Azure a mano — suficiente para
// el piloto; si Tecnologia quiere validacion estricta de certificado, aqui
// se puede pasar { ca: <contenido del .pem de Azure> } en su lugar.
export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  // PGSSL=no solo para pruebas locales sin SSL; en Azure siempre va con SSL.
  ssl: process.env.PGSSL === 'no' ? false : { rejectUnauthorized: false },
  max: 10,
  connectionTimeoutMillis: 8000,
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de Postgres:', err);
});

// Esquema corporativo donde deben vivir las tablas (ver informe tecnico de
// Tecnologia: la conexion no trae "progreso" en su search_path, asi que
// cada consulta debe calificarlo explicitamente — nunca confiar en el
// esquema "public" por defecto). Viene solo de la configuracion del
// servidor, nunca de una solicitud del cliente.
export const SCHEMA = process.env.PGSCHEMA || 'progreso';

// Helper para nombrar una tabla calificada con el esquema, ej. tabla('conteos')
// -> "progreso.conteos". Los nombres de tabla siempre son literales fijos en
// el codigo (nunca vienen de req), asi que no hay riesgo de inyeccion aqui.
export const tabla = (nombre) => `${SCHEMA}.${nombre}`;
