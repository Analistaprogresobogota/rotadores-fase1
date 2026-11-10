const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';

// Llamada generica a Graph con el token ya obtenido.
export async function graphFetch(ruta, { token, method = 'GET', body } = {}) {
  const respuesta = await fetch(`${GRAPH_BASE}${ruta}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => '');
    throw new Error(`Graph ${respuesta.status}: ${detalle}`);
  }
  // DELETE (y algunos POST) devuelven 204 sin cuerpo: no hay nada que parsear.
  if (respuesta.status === 204) return null;
  return respuesta.json();
}

// Trae todos los items de una lista, siguiendo @odata.nextLink hasta agotar paginas.
export async function obtenerTodosLosItems(rutaLista, token) {
  let ruta = `${rutaLista}?expand=fields&$top=200`;
  let items = [];
  while (ruta) {
    const datos = await graphFetch(ruta.startsWith('http') ? ruta.replace(GRAPH_BASE, '') : ruta, { token });
    items = items.concat(datos.value);
    ruta = datos['@odata.nextLink'] || null;
  }
  return items;
}
