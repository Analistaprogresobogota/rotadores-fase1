// Configuracion de la app, leida de variables de entorno (.env).
// Ver README.md para saber de donde sacar cada valor real.
export const CONFIG = {
  tenantId: import.meta.env.VITE_TENANT_ID || '',
  clientId: import.meta.env.VITE_CLIENT_ID || '',
  siteId: import.meta.env.VITE_SITE_ID || '',
  listSkusId: import.meta.env.VITE_LIST_SKUS_ID || '',
  listModulosId: import.meta.env.VITE_LIST_MODULOS_ID || '',
  listConteosId: import.meta.env.VITE_LIST_CONTEOS_ID || '',
  listHistorialId: import.meta.env.VITE_LIST_HISTORIAL_ID || '',
  listRotadoresId: import.meta.env.VITE_LIST_ROTADORES_ID || '',
  sede: import.meta.env.VITE_SEDE || 'Tocancipá',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  // URL publica de api-rotadores (ver /api-rotadores en la raiz del
  // proyecto), la API propia que reemplaza a Supabase hablando con la base
  // de datos de Tecnologia en Azure. Si esta llena, tiene prioridad sobre
  // Supabase — ver USAR_API abajo.
  apiUrl: (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''),
};

export const USAR_API = Boolean(CONFIG.apiUrl) && import.meta.env.VITE_MODO_LOCAL !== 'si';

// Si hay URL y clave de Supabase configuradas, el modo demo (login local de
// Rotador/Supervisor) guarda y lee de Supabase en vez de memoria — asi los
// datos quedan en linea y se comparten entre dispositivos, sin necesitar la
// configuracion completa de Entra ID / SharePoint de mas abajo.
// MODO_LOCAL (.env.local: VITE_MODO_LOCAL=si): ignora Supabase/API y trabaja
// con los datos embebidos + almacenamiento del navegador (prototipo publicado).
export const MODO_LOCAL = import.meta.env.VITE_MODO_LOCAL === 'si';
export const USAR_SUPABASE = !MODO_LOCAL && Boolean(CONFIG.supabaseUrl && CONFIG.supabaseAnonKey);

// Valores de ejemplo del .env.example: mientras sigan puestos, no hay
// configuracion real de Entra/SharePoint y solo se puede entrar en modo demo.
const PLACEHOLDER = '00000000-0000-0000-0000-000000000000';

export const CONFIG_COMPLETA = Boolean(
  CONFIG.tenantId &&
    CONFIG.clientId &&
    CONFIG.siteId &&
    CONFIG.listSkusId &&
    CONFIG.listModulosId &&
    CONFIG.listConteosId &&
    CONFIG.listHistorialId &&
    CONFIG.listRotadoresId &&
    CONFIG.tenantId !== PLACEHOLDER &&
    CONFIG.clientId !== PLACEHOLDER
);
