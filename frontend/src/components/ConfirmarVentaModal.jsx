import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider,
} from '@mui/material';
import { X, ShoppingCart, CheckCircle } from 'lucide-react';

function ConfirmarVentaModal({ open, carrito, subtotal, iva, total, onConfirmar, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          sx={{ color: 'white', minWidth: 'auto', '&:hover': { background: '#333' } }}
        >
          <X size={20} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 2.5, px: 3 }}>
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
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1.5,
          gap: 1,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            background: '#2A2A2A',
            color: 'white',
            border: '1px solid #404040',
            borderRadius: '6px',
            fontWeight: 600,
            textTransform: 'none',
            px: 3,
            '&:hover': { background: '#333' },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={onConfirmar}
          startIcon={<CheckCircle size={18} />}
          sx={{
            background: 'var(--mint-primary)',
            color: '#0D0D0D',
            borderRadius: '6px',
            fontWeight: 700,
            textTransform: 'none',
            px: 3,
            '&:hover': { background: '#3FBEA0' },
            '& .MuiButton-startIcon': { marginRight: '6px' },
          }}
        >
          Confirmar Venta
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmarVentaModal;
