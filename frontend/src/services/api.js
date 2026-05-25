const BASE = 'http://localhost:8000/api';

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    const err  = new Error('API error');
    err.data   = data;
    throw err;
  }
  return data;
}

// GET /api/productos/ → trae el catálogo al cargar la página
export const getProductos = () =>
  fetch(`${BASE}/productos/`)
    .then(handleResponse)
    .then(data => data.map(p => ({ ...p, precio: parseFloat(p.precio) })));

// GET /api/dashboard/stats/ → estadísticas para el dashboard
export const getDashboard = () =>
  fetch(`${BASE}/dashboard/stats/`).then(handleResponse);

// POST /api/ventas/ → se llama al confirmar la venta
export const crearVenta = ({ metodo_pago, items }) =>
  fetch(`${BASE}/ventas/`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ metodo_pago, items }),
  }).then(handleResponse);
