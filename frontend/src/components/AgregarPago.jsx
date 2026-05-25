import { useState, useMemo } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, Box, Select, MenuItem, InputLabel, FormControl,
  Alert
} from '@mui/material';
import '../styles/Index.css'
import { Save, Ban, Calendar, CreditCard, Clock, AlertCircle } from 'lucide-react';
import * as Yup from 'yup';

const preciosMembresia = {
    mensual: 400.00,
    trimestral: 1100.00,
    semestral: 2000.00,
    anual: 3800.00
};

const calcularFechaFin = (tipo) => {
    if (!tipo) return null;
    const fecha = new Date();
    if (tipo === 'mensual') fecha.setMonth(fecha.getMonth() + 1);
    if (tipo === 'trimestral') fecha.setMonth(fecha.getMonth() + 3);
    if (tipo === 'semestral') fecha.setMonth(fecha.getMonth() + 6);
    if (tipo === 'anual') fecha.setFullYear(fecha.getFullYear() + 1);
    
    return fecha.toISOString().split('T')[0];
};

function AgregarPago({open, onClose, item, onActualizar}) {
    const [tipoPago, setTipoPago] = useState('');
    const [metodoPago, setMetodoPago] = useState('efectivo');

    const handleClose = () => {
        setTipoPago('');
        setMetodoPago('efectivo'); 
        onClose?.();
    };

    const ultimoPagoInfo = useMemo(() => {
        if (!item || !item.pagos || item.pagos.length === 0) return null;
        return item.pagos[0]; 
    }, [item]);

    // Verifica si la fecha de fin es mayor o igual a hoy
    const isMembresiaActiva = useMemo(() => {
        if (!ultimoPagoInfo || !ultimoPagoInfo.fecha_fin) return false;
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); 
        
        const [year, month, day] = ultimoPagoInfo.fecha_fin.split('-');
        const fechaVencimiento = new Date(year, month - 1, day);
        fechaVencimiento.setHours(0, 0, 0, 0);
        
        return fechaVencimiento >= hoy;
    }, [ultimoPagoInfo]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!item) {
            <Alert severity='error' >Ocurrió un error: No hay un socio seleccionado.</Alert>
            return;
        }
        if (!tipoPago) {
            <Alert severity='error' >Por favor, selecciona un tipo de pago.</Alert>
            return;
        }

        const payload = {
            socio: item.id,
            tipo_membresia: tipoPago,
            monto: preciosMembresia[tipoPago],
            metodo_pago: metodoPago,
            fecha_fin: calcularFechaFin(tipoPago)
        };

        fetch('http://127.0.0.1:8000/api/socios/historial-pagos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        .then(respuesta => { //revisa los http
            if (!respuesta.ok) throw new Error('Error al registrar el pago');
            return respuesta.json();
        })
        .then(pagoGuardado => {
            console.log("Pago exitoso:", pagoGuardado);
            if (onActualizar) {
                onActualizar();
            }
            handleClose();
        })
        .catch(error => {
            console.error("Error:", error);
            <Alert severity='error' >Ocurrió un problema en el proceso de cobro.</Alert>
        });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiBackdrop-root': {
                    background: 'rgba(0,0,0,0.92)',
                    backdropFilter: 'blur(3px)',
                },
            }}
            slotProps={{
                paper: {
                    sx: {
                        background: '#1A1A1A',
                        border: '1px solid var(--mint-light)',
                        borderRadius: '14px',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
                    },
                },
            }}
        >
            <DialogTitle sx={{ borderBottom: '1px solid rgba(82,212,168,0.25)', pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--mint-primary)' }}>
                    Agregar Pago de Membresía
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#B0B0B0' }}>
                    Socio: <span style={{color: 'white', fontWeight: 600}}>{item?.nombre} {item?.apellidos}</span>
                </Typography>
            </DialogTitle>
            
            <DialogContent sx={{ mt: 2 }}>
                
                {ultimoPagoInfo ? (
                    <Box sx={{ mb: 3, p: 2.5, borderRadius: 2, background: 'rgba(82,212,168,0.06)', border: '1px solid rgba(82,212,168,0.25)' }}>
                        <Typography variant="caption" sx={{ color: 'var(--mint-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', mb: 1.5 }}>
                            Última Membresía Registrada
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CreditCard size={18} color="#B0B0B0" />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#B0B0B0', display: 'block' }}>Tipo</Typography>
                                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, textTransform: 'capitalize' }}>
                                        {ultimoPagoInfo.tipo_membresia}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Calendar size={18} color="#B0B0B0" />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#B0B0B0', display: 'block' }}>Pagado el</Typography>
                                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                        {ultimoPagoInfo.fecha_pago.split('T')[0]} 
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Clock size={18} color={isMembresiaActiva ? '#52D4A8' : '#E74C3C'} />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#B0B0B0', display: 'block' }}>Vence el</Typography>
                                    <Typography variant="body2" sx={{ color: isMembresiaActiva ? '#52D4A8' : '#E74C3C', fontWeight: 600 }}>
                                        {ultimoPagoInfo.fecha_fin}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                         <Typography variant="body2" sx={{ color: '#B0B0B0', textAlign: 'center' }}>
                            Este socio es nuevo o no tiene historial de pagos registrados.
                        </Typography>
                    </Box>
                )}

                {/* MENSAJE DE BLOQUEO VISUAL */}
                {isMembresiaActiva && (
                    <Box sx={{ p: 2, borderRadius: 2, background: 'rgba(231, 220, 60, 0.1)', 
                        border: '1px solid rgba(231, 183, 60, 0.3)', display: 'flex', 
                        gap: 1.5, alignItems: 'center' }}
                    >
                        <AlertCircle color="var(--warning)" size={24} />
                        <Typography variant="body2" sx={{ color: '#ffeba8' }}>
                            <strong>Cobro bloqueado:</strong> El socio cuenta con una membresía vigente. No se pueden registrar pagos nuevos hasta que caduque la actual.
                        </Typography>
                    </Box>
                )}
                {!isMembresiaActiva && (     
                    <>         
                    <Box
                        component="form"
                        id="form-agregar-pago"
                        onSubmit={handleSubmit}
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 2.5,
                        }}
                    >
                        <FormControl fullWidth variant="outlined" required>
                            <InputLabel id="tipo-pago-label" sx={{ color: '#B0B0B0', '&.Mui-focused': { color: '#52D4A8' } }}>
                                Tipo de Membresía
                            </InputLabel>
                            <Select
                                name="tipo_membresia"
                                labelId="tipo-pago-label"
                                id="tipo-pago"
                                value={tipoPago}
                                label="Seleccionar tipo de membresía"
                                onChange={(e) => setTipoPago(e.target.value)}
                                sx={{
                                    color: 'white',
                                    background: 'var(--gray-dark)',
                                    '& .MuiSelect-select': { padding: '14px 14px' },
                                }}
                            >
                                <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                <MenuItem value="mensual">Mensual</MenuItem>
                                <MenuItem value="trimestral">Trimestral</MenuItem>
                                <MenuItem value="semestral">Semestral</MenuItem>
                                <MenuItem value="anual">Anual</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="outlined" required>
                            <InputLabel id="metodo-pago-label" sx={{ color: '#B0B0B0', '&.Mui-focused': { color: '#52D4A8' } }}>
                                Método de pago
                            </InputLabel>
                            <Select
                                name="metodo_pago"
                                labelId="metodo-pago-label"
                                id="metodo-pago"
                                value={metodoPago}
                                label="Método de pago"
                                onChange={(e) => setMetodoPago(e.target.value)}
                                sx={{
                                    color: 'white',
                                    background: 'var(--gray-dark)',
                                    '& .MuiSelect-select': { padding: '14px 14px' },
                                }}
                            >
                                <MenuItem value="efectivo">Efectivo</MenuItem>
                                <MenuItem value="tarjeta">Tarjeta</MenuItem>
                                <MenuItem value="transferencia">Transferencia</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <Box
                        sx={{
                            mt: 3, 
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid rgba(82,212,168,0.18)',  
                            background: 'rgba(255,255,255,0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: '#B0B0B0', fontWeight: 600}}>
                                Nueva fecha de vencimiento:
                            </Typography>
                            <Typography variant="body2" sx={{color: tipoPago ? 'var(--mint-primary)' : '#B0B0B0', fontWeight: 600}}>
                                {tipoPago ? calcularFechaFin(tipoPago) : 'Selecciona un plan'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', pt: 1.5 }}>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600}}>
                                Monto a cobrar:
                            </Typography>
                            <Typography variant="body1" sx={{color: 'var(--mint-primary)', fontWeight: 600}}>
                                {"$" + (preciosMembresia[tipoPago] || 0).toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        background: '#2A2A2A',
                        color: 'white',
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 2,
                        '&:hover': { background: '#333' },
                    }}
                >
                    <Ban size={18} style={{ marginRight: 6 }} />
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    form="form-agregar-pago"
                    disabled={isMembresiaActiva} 
                    sx={{
                        background: isMembresiaActiva ? 'var(--gray-dark)' : '#52D4A8', 
                        color: isMembresiaActiva ? 'var(--gray-lightest)' : '#0D0D0D',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 3,
                        '&:hover': { background: isMembresiaActiva ? 'var(--gray-dark)' : '#45c299' },
                    }}
                >
                    <Save size={18} style={{ marginRight: 6 }} />
                    Registrar Cobro
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AgregarPago