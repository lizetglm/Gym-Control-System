import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider,
} from '@mui/material';
import { X, ShoppingCart, CheckCircle, Loader } from 'lucide-react';

const METODOS = [
  { value: 'efectivo',      label: 'Efectivo'      },
  { value: 'tarjeta',       label: 'Tarjeta'       },
  { value: 'transferencia', label: 'Transferencia' },
];

function ConfirmarVentaModal({ open, carrito, subtotal, iva, total, cargando, error, onConfirmar, onClose }) {
  const [metodoPago, setMetodoPago] = useState('efectivo');

  useEffect(() => {
    if (!open) setMetodoPago('efectivo');
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={cargando ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiBackdrop-root': {
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(2px)',
        },
      }}
      slotProps={{
        paper: {
          sx: {
            background: 'var(--gray-darkest)',
            border: '1px solid var(--mint-primary)',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      {/* ── Header ── */}
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
          <ShoppingCart size={22} color="#52D4A8" />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--mint-primary)' }}>
            Confirmar Venta
          </Typography>
        </Box>
        <Button
          variant="text"
          onClick={onClose}
          disabled={cargando}
          sx={{ color: 'white', minWidth: 'auto', '&:hover': { background: '#333' } }}
        >
          <X size={20} />
        </Button>
      </DialogTitle>

      {/* ── Contenido ── */}
      <DialogContent sx={{ pt: 2.5, px: 3 }}>

        {/* Resumen de productos */}
        <Typography
          variant="caption"
          sx={{ color: '#B0B0B0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
        >
          Resumen de productos
        </Typography>

        <Box sx={{ mt: 1.5, mb: 1 }}>
          {carrito.map(item => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {item.nombre}
                </Typography>
                <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                  {item.cantidad} × ${item.precio.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--mint-primary)', fontWeight: 700 }}>
                ${(item.precio * item.cantidad).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Totales */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.6 }}>
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Subtotal</Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.6 }}>
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>IVA (16%)</Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>${iva.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(82,212,168,0.45)', my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.4 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>Total</Typography>
            <Typography variant="h6" sx={{ color: 'var(--mint-primary)', fontWeight: 700 }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Método de pago */}
        <Box sx={{ mt: 2.5 }}>
          <Typography
            variant="caption"
            sx={{ color: '#B0B0B0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}
          >
            Método de pago
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {METODOS.map(m => {
              const activo = metodoPago === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setMetodoPago(m.value)}
                  disabled={cargando}
                  style={{
                    flex: 1,
                    padding: '9px 6px',
                    background:   activo ? '#52D4A8' : '#2A2A2A',
                    color:        activo ? '#0D0D0D' : '#B0B0B0',
                    border:       `1px solid ${activo ? '#52D4A8' : '#404040'}`,
                    borderRadius: '8px',
                    cursor:       cargando ? 'not-allowed' : 'pointer',
                    fontWeight:   activo ? 700 : 400,
                    fontSize:     '0.83rem',
                    transition:   'all 0.15s',
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </Box>
        </Box>

        {/* Error */}
        {error && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              background: 'rgba(231,76,60,0.12)',
              border: '1px solid rgba(231,76,60,0.4)',
              borderRadius: '8px',
            }}
          >
            <Typography variant="body2" sx={{ color: '#E74C3C' }}>
              {error}
            </Typography>
          </Box>
        )}
      </DialogContent>

      {/* ── Acciones ── */}
      <DialogActions
        sx={{
          px: 3, pb: 2.5, pt: 1.5,
          gap: 1,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Button
          onClick={onClose}
          disabled={cargando}
          sx={{
            background: '#2A2A2A', color: 'white',
            border: '1px solid #404040', borderRadius: '6px',
            fontWeight: 600, textTransform: 'none', px: 3,
            '&:hover': { background: '#333' },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onConfirmar(metodoPago)}
          disabled={cargando}
          startIcon={cargando ? <Loader size={16} /> : <CheckCircle size={18} />}
          sx={{
            background: 'var(--mint-primary)', color: '#0D0D0D',
            borderRadius: '6px', fontWeight: 700,
            textTransform: 'none', px: 3,
            '&:hover': { background: '#3FBEA0' },
            '&.Mui-disabled': { opacity: 0.6 },
            '& .MuiButton-startIcon': { marginRight: '6px' },
          }}
        >
          {cargando ? 'Procesando...' : 'Confirmar Venta'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmarVentaModal;
