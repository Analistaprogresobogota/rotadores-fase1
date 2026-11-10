import { EventEmitter } from 'node:events';

// Reemplaza el "postgres_changes" de Supabase Realtime con algo mas simple:
// un emisor de eventos en memoria + Server-Sent Events (SSE). Cuando algo
// cambia en conteos/historial/bloqueos, se avisa a todos los dispositivos
// conectados para que refresquen, sin recargar la pagina.
//
// Limitacion a proposito, para mantenerlo simple: solo funciona si la API
// corre en UN solo proceso/instancia — si el dia de mañana se escala a
// varias instancias, tocaria pasar esto a Postgres LISTEN/NOTIFY.
export const cambios = new EventEmitter();
cambios.setMaxListeners(0);
