import { useState, useMemo, useEffect } from 'react';
import { Search, Minus, Plus, X, ShoppingCart, ChevronRight } from 'lucide-react';
import {
  Dialog, DialogTitle, DialogContent,
  Button, Typography, Box,
} from '@mui/material';
import '../styles/Ventas.css';
import '../styles/Index.css';
import ConfirmarVentaModal from '../components/ConfirmarVentaModal';
import { getProductos, crearVenta } from '../services/api';

const CATEGORIAS = ['Todos', 'Suplementos', 'Accesorios', 'Bebidas', 'Snacks'];
const IVA_RATE   = 0.16;

/* ── Contenido del ticket ── */
function TicketContent({ carrito, subtotal, iva, total, cambiarCantidad, onLimpiar, onRealizarVenta }) {
  return (
    <>
      <div className="lista-ticket">
        {carrito.length === 0 ? (
          <p className="estado-vacio ticket-vacio">No hay productos agregados</p>
        ) : (
          carrito.map(item => (
            <div key={item.id} className="ticket-item">
              <div className="ticket-item-top">
                <span className="ticket-item-nombre">{item.nombre}</span>
                <span className="ticket-item-precio">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </span>
              </div>
              <div className="ticket-item-controles">
                <div className="qty-controls">
                  <button className="btn-qty" onClick={() => cambiarCantidad(item.id, -1)}>
                    <Minus size={11} />
                  </button>
                  <span className="qty-valor">{item.cantidad}</span>
                  <button className="btn-qty" onClick={() => cambiarCantidad(item.id, 1)}>
                    <Plus size={11} />
                  </button>
                </div>
                <span className="precio-unit">${item.precio.toFixed(2)} c/u</span>
                <button className="btn-quitar" onClick={() => cambiarCantidad(item.id, -item.cantidad)}>
                  <X size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="ticket-totales">
        <div className="ticket-fila">
          <span className="ticket-label">Subtotal :</span>
          <span className="ticket-dash"></span>
          <span className="ticket-valor">${subtotal.toFixed(2)}</span>
        </div>
        <div className="ticket-fila">
          <span className="ticket-label">IVA (16%) :</span>
          <span className="ticket-dash"></span>
          <span className="ticket-valor">${iva.toFixed(2)}</span>
        </div>
        <div className="ticket-separador"></div>
        <div className="ticket-fila ticket-total">
          <span className="ticket-label">Total :</span>
          <span className="ticket-dash"></span>
          <span className="ticket-valor total-valor">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="ticket-acciones">
        <button className="btn-limpiar" onClick={onLimpiar} disabled={carrito.length === 0}>
          Limpiar
        </button>
        <button
          className="btn-realizar-venta"
          onClick={onRealizarVenta}
          disabled={carrito.length === 0}
        >
          Realizar Venta
        </button>
      </div>
    </>
  );
}

/* ── Página principal ── */
function Ventas() {
  const [busqueda, setBusqueda]               = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [carrito, setCarrito]                 = useState([]);
  const [confirmarOpen, setConfirmarOpen]     = useState(false);
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false);

  const [productos, setProductos]             = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos]   = useState(null);

  const [cargandoVenta, setCargandoVenta]     = useState(false);
  const [errorVenta, setErrorVenta]           = useState(null);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch(() => setErrorProductos('No se pudo cargar el catálogo. Verifica que el servidor esté activo.'))
      .finally(() => setCargandoProductos(false));
  }, []);

  const getQty = (id) => carrito.find(i => i.id === id)?.cantidad ?? 0;

  const productosFiltrados = useMemo(() =>
    productos.filter(p => {
      const matchBusqueda =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoriaActiva === 'Todos' || p.categoria === categoriaActiva;
      return matchBusqueda && matchCategoria;
    }),
    [productos, busqueda, categoriaActiva]
  );

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id);
      if (existente) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev =>
      prev
        .map(item => item.id === id ? { ...item, cantidad: item.cantidad + delta } : item)
        .filter(item => item.cantidad > 0)
    );
  };

  const subtotal   = useMemo(() => carrito.reduce((s, i) => s + i.precio * i.cantidad, 0), [carrito]);
  const iva        = subtotal * IVA_RATE;
  const total      = subtotal + iva;
  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);

  const handleRealizarVenta = () => {
    setTicketDrawerOpen(false);
    setErrorVenta(null);
    if (carrito.length > 0) setConfirmarOpen(true);
  };

  const handleConfirmarVenta = async (metodoPago) => {
    setCargandoVenta(true);
    setErrorVenta(null);
    try {
      await crearVenta({
        metodo_pago: metodoPago,
        items: carrito.map(i => ({ producto_id: i.id, cantidad: i.cantidad })),
      });
      // Refrescar stock en catálogo
      getProductos().then(setProductos).catch(() => {});
      setCarrito([]);
      setConfirmarOpen(false);
    } catch (err) {
      const data = err.data ?? {};
      const msg  =
        data.items?.[0] ||
        data.non_field_errors?.[0] ||
        data.detail ||
        'Error al procesar la venta. Intenta de nuevo.';
      setErrorVenta(msg);
    } finally {
      setCargandoVenta(false);
    }
  };

  const ticketProps = {
    carrito, subtotal, iva, total,
    cambiarCantidad,
    onLimpiar:       () => setCarrito([]),
    onRealizarVenta: handleRealizarVenta,
  };

  return (
    <div id="contendor">
      <header>
        <h1>Punto de Venta</h1>
      </header>

      <div id="contenedor-a">

        {/* ── CATÁLOGO ── */}
        <div id="contenedor-productos">
          <div className="panel-header">
            <h3>Catálogo</h3>
            <span className="info-badge">
              {cargandoProductos ? '...' : `${productosFiltrados.length} productos activos`}
            </span>
          </div>

          <div className="input-busqueda">
            <Search size={15} className="busqueda-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>

          <div className="chips-categorias">
            {CATEGORIAS.map(cat => (
              <button
                key={cat}
                className={`chip-categoria${categoriaActiva === cat ? ' activa' : ''}`}
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div id="productos">
            {cargandoProductos ? (
              <p className="estado-vacio">Cargando catálogo...</p>
            ) : errorProductos ? (
              <p className="estado-vacio">{errorProductos}</p>
            ) : productosFiltrados.length === 0 ? (
              <p className="estado-vacio">No se encontraron productos</p>
            ) : (
              productosFiltrados.map(producto => {
                const qty       = getQty(producto.id);
                const agotado   = producto.stock === 0 && qty === 0;
                return (
                  <div
                    key={producto.id}
                    className={`card-producto${qty > 0 ? ' en-carrito' : ''}${agotado ? ' agotado' : ''}`}
                    onClick={() => !agotado && qty === 0 && agregarAlCarrito(producto)}
                  >
                    <div className="card-producto-info">
                      <h4 className="nombre-producto">{producto.nombre}</h4>
                      <span className="categoria-label">{producto.categoria}</span>
                      <span className="precio">${producto.precio.toFixed(2)}</span>
                      {agotado && <span className="stock-agotado">Sin stock</span>}
                    </div>

                    {agotado ? null : qty === 0 ? (
                      <button
                        className="btn-agregar"
                        onClick={e => { e.stopPropagation(); agregarAlCarrito(producto); }}
                      >
                        + Agregar
                      </button>
                    ) : (
                      <div className="qty-card-controls" onClick={e => e.stopPropagation()}>
                        <button className="qty-card-btn" onClick={() => cambiarCantidad(producto.id, -1)}>
                          <Minus size={15} />
                        </button>
                        <span className="qty-card-value">{qty}</span>
                        <button className="qty-card-btn" onClick={() => cambiarCantidad(producto.id, 1)}>
                          <Plus size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── TICKET (desktop + tablet) ── */}
        <div id="contenedor-ticket">
          <div className="panel-header" style={{ marginBottom: '14px' }}>
            <h3>Ticket de Venta</h3>
            <span className="ticket-badge">{totalItems} items</span>
          </div>
          <TicketContent {...ticketProps} />
        </div>

      </div>

      {/* ── BARRA FLOTANTE (solo móvil) ── */}
      {totalItems > 0 && (
        <div className="floating-cart" onClick={() => setTicketDrawerOpen(true)}>
          <div className="floating-cart-left">
            <ShoppingCart size={18} />
            <span className="floating-cart-items">
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </span>
          </div>
          <span className="floating-cart-total">${total.toFixed(2)}</span>
          <div className="floating-cart-action">
            <span>Ver Ticket</span>
            <ChevronRight size={16} />
          </div>
        </div>
      )}

      {/* ── TICKET DRAWER móvil ── */}
      <Dialog
        open={ticketDrawerOpen}
        onClose={() => setTicketDrawerOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiBackdrop-root': { background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' } }}
        slotProps={{
          paper: {
            sx: {
              background: 'var(--gray-darkest)',
              border: '1px solid var(--mint-primary)',
              borderRadius: '12px',
              color: 'white',
              mx: 2,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '1.5px solid rgba(82,212,168,0.35)',
            pb: 2,
            background: '#151515',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart size={20} color="#52D4A8" />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--mint-primary)' }}>
              Ticket de Venta
            </Typography>
            <Box
              component="span"
              sx={{
                background: 'var(--mint-primary)', color: '#0D0D0D',
                fontSize: '0.72rem', fontWeight: 700,
                px: 1.2, py: 0.3, borderRadius: '20px',
              }}
            >
              {totalItems} items
            </Box>
          </Box>
          <Button
            variant="text"
            onClick={() => setTicketDrawerOpen(false)}
            sx={{ color: 'white', minWidth: 'auto', '&:hover': { background: '#333' } }}
          >
            <X size={20} />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ px: 2, pt: 1, pb: 0 }}>
          <TicketContent {...ticketProps} />
        </DialogContent>
      </Dialog>

      {/* ── CONFIRMAR VENTA ── */}
      <ConfirmarVentaModal
        open={confirmarOpen}
        carrito={carrito}
        subtotal={subtotal}
        iva={iva}
        total={total}
        cargando={cargandoVenta}
        error={errorVenta}
        onConfirmar={handleConfirmarVenta}
        onClose={() => { setConfirmarOpen(false); setErrorVenta(null); }}
      />
    </div>
  );
}

export default Ventas;
