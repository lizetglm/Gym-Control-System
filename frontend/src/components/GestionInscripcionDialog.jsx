import { useMemo, useState } from 'react';
import { X, Save, Ban, Trash2 } from 'lucide-react';
import {
  Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import '../styles/Clases.css';

function GestionInscripcionDialog({ open, onClose, mode, clase, socios = [], inscripcionesClase = [], onSubmit, onDelete }) {
  const [search, setSearch] = useState('');
  const [selectedSocioId, setSelectedSocioId] = useState('');
  const [selectedInscripcionId, setSelectedInscripcionId] = useState('');

  const handleClose = () => handleCloseAndReset();
  
  const handleCloseAndReset = () => {
    resetState();
    onClose(false);
  };

  // Filtramos SIEMPRE para que solo se pueda elegir a socios "Activos"
  const sociosActivos = useMemo(() => {
    return socios.filter((s) => String(s.estado).toLowerCase() === 'activo');
  }, [socios]);

  const sociosFiltrados = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return sociosActivos;
    
    return sociosActivos.filter((s) => {
      const full = `${s.nombre} ${s.apellidos} ${s.correo}`.toLowerCase();
      return full.includes(term);
    });
  }, [sociosActivos, search]);

  const listaVisible = search.trim() ? sociosFiltrados : sociosActivos.slice(-3).reverse();

  const inscripcionSeleccionada = useMemo(() => 
    inscripcionesClase.find((i) => String(i.id) === String(selectedInscripcionId)), 
  [inscripcionesClase, selectedInscripcionId]);

  const socioSeleccionado = useMemo(() => 
    sociosActivos.find((s) => String(s.id) === String(selectedSocioId)), 
  [sociosActivos, selectedSocioId]);

  const handleInscribir = (e) => {
    e?.preventDefault();
    if (!socioSeleccionado || !clase) return;

    onSubmit?.({
      mode: 'create',
      claseId: clase.id,
      socioId: socioSeleccionado.id,
    });
    
    handleCloseAndReset();
  };

  const handleEliminar = () => {
    if (!inscripcionSeleccionada) return;
    onDelete?.(inscripcionSeleccionada.id);
    handleCloseAndReset();
  };

  const resetState = () => {
    setSearch('');
    setSelectedSocioId('');
    setSelectedInscripcionId('');
  };
  
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      background: 'var(--gray-dark)',
      '& fieldset': { borderColor: '#404040' },
      '&:hover fieldset': { borderColor: '#52D4A8' },
      '&.Mui-focused fieldset': { borderColor: '#52D4A8' },
    },
    '& .MuiInputLabel-root': { color: '#B0B0B0' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#52D4A8' },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      scroll="paper"
      sx={{ '& .MuiBackdrop-root': { background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' } }}
      slotProps={{ paper: { sx: { background: 'var(--gray-darkest)', border: mode === 'delete' ? '1px solid rgba(231,76,60,0.35)' : '1px solid var(--mint-primary)', color: 'white' } } }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)', pb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: mode === 'delete' ? '#E74C3C' : 'var(--mint-primary)' }}>
            {mode === 'delete' ? 'Eliminar socio de la clase' : 'Inscribir socio'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#B0B0B0' }}>{clase?.nombre} · {clase?.instructor}</Typography>
        </Box>
        <Button onClick={handleClose} variant="text" sx={{ color: 'white', minWidth: 0, p: 1 }}><X size={20} /></Button>
      </DialogTitle>

      <DialogContent  sx={{ pt: 3, px: { xs: 2, sm: 3 }, pb: 2 }} onSubmit={handleInscribir}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            Selecciona el socio que deseas {mode === 'delete' ? 'eliminar' : 'inscribir'} en la clase <strong>{clase?.nombre}</strong>. Solo se muestran socios con mensualidad activa.
          </Typography>

          {!socioSeleccionado ? (
            <>
              <TextField
                placeholder="Buscar socio activo por nombre, apellidos o email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={textFieldStyles}
                autoFocus
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 220, overflowY: 'auto' }}>
                {listaVisible.length === 0 ? (
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>No se encontraron socios activos.</Typography>
                ) : (
                  listaVisible.map((s) => (
                    <Box
                      key={s.id}
                      onClick={() => setSelectedSocioId(s.id)}
                      sx={{
                        p: 1,
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.02)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': { background: 'rgba(255,255,255,0.02)' },
                      }}
                    >
                      <Typography sx={{ fontWeight: 700 }}>{s.nombre} {s.apellidos}</Typography>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>{s.correo} {s.telefono ? `· ${s.telefono}` : ''}</Typography>
                      
                    </Box>
                  ))
                )}
              </Box>
            </>
          ) : (
            <Box sx={{ 
              p: 2.5, 
              background: 'rgba(82, 212, 168, 0.06)', 
              border: '1px solid var(--mint-primary)', 
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <Box>
                <Box sx={{display: 'felx', justifyContent: 'space-between'}}>
                  <Typography variant="caption" sx={{ color: 'var(--mint-primary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Socio Seleccionado
                  </Typography>
                  <Button 
                    onClick={() => setSelectedSocioId('')} 
                    title="Deseleccionar socio"
                    sx={{ 
                      minWidth: 0, 
                      p: 0.5,
                      ml: 1,
                      color: '#B0B0B0',
                      borderRadius: '8px',
                      '&:hover': { background: 'rgba(231,76,60,0.15)', color: '#E74C3C' } 
                    }}
                  >
                    <X size={19} />
                  </Button>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', mt: 0.5, color: 'white' }}>
                  {socioSeleccionado.nombre} {socioSeleccionado.apellidos}
                </Typography>
                <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 0.5, overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                  {socioSeleccionado.correo}
                </Typography>
                <Typography variant="caption" sx={{ color: '#9AA0A6' }}>
                  ID: {socioSeleccionado.id}
                </Typography>
              </Box>

              
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Button onClick={handleClose} sx={{ background: '#2A2A2A', color: 'white', border: '1px solid #404040', borderRadius: '8px', textTransform: 'none', fontWeight: 700, px: 2 }}>
          <Ban size={18} style={{ marginRight: 6 }} />Cancelar
        </Button>

        {mode === 'delete' ? (
          <Button onClick={handleEliminar} disabled={!selectedInscripcionId} sx={{ background: '#E74C3C', color: 'white', borderRadius: '8px', textTransform: 'none', fontWeight: 700, px: 3 }}>
            <Trash2 size={18} style={{ marginRight: 8 }} />Eliminar
          </Button>
        ) : (
          <Button onClick={handleInscribir} disabled={!selectedSocioId} sx={{ background: '#52D4A8', color: '#0D0D0D', borderRadius: '8px', textTransform: 'none', fontWeight: 700, px: 3 }}>
            <Save size={18} style={{ marginRight: 8 }} />Inscribir
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default GestionInscripcionDialog;