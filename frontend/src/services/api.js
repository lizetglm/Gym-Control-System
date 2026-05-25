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

export const getProductos = () =>
  fetch(`${BASE}/productos/`)
    .then(handleResponse)
    .then(data => data.map(p => ({ ...p, precio: parseFloat(p.precio) })));

export const crearVenta = ({ metodo_pago, items }) =>
  fetch(`${BASE}/ventas/`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ metodo_pago, items }),
  }).then(handleResponse);
