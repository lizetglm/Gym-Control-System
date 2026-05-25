import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
    Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import '../styles/Index.css'
import {Save, Ban} from 'lucide-react'

function AgregarPago({open, onClose, item}) {
    const handleClose = () => {
        setTipoPago('');
        onClose?.();
    };

    const paymentSummary = {
        estadoPago: item?.estadoPago || 'Sin información',
        fechaInicio: item?.fechaInicio || 'Pendiente',
        fechaFin: item?.fechaFin || 'Pendiente',
        ultimoPago: item?.ultimoPago || 'Pendiente',
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson);

        /*
        Resultado:
        {
            nombre: "...",
            apellidos: "...",
            correo: "...",
            telefono: "..."
        }
        */
        // Aquí haces tu fetch

        handleClose();
    };

    const [tipoPago, setTipoPago] = useState('');

    const handleTipoChange = (e) => {
        setTipoPago(e.target.value);
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

            <DialogTitle
                sx={{
                borderBottom: '1px solid rgba(82,212,168,0.25)',
                pb: 2,
                }}
            >
                <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    color: 'var(--mint-primary)',
                }}
                >
                    Agregar Pago
                </Typography>

                <Typography
                variant="body2"
                sx={{
                    mt: 1,
                    color: '#B0B0B0',
                }}
                >
                    Por favor, completa el formulario para agregar un nuevo pago.
                </Typography>
            </DialogTitle>
            
            <DialogContent
                sx={{
                pt: '24px !important',
                }}
            >
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid rgba(82,212,168,0.18)',
                        background: 'rgba(255,255,255,0.03)',
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{ color: 'var(--mint-primary)', letterSpacing: 1.1 }}
                    >
                        Información actual del socio
                    </Typography>

                    <Box
                        sx={{
                            mt: 1.5,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                            gap: 1.5,
                        }}
                    >
                        <Box>
                            <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                                Estado de pago
                            </Typography>
                            {/* Se pondran el numero de pagos que tenga activos */}
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                {paymentSummary.estadoPago}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                                Inicio actual
                            </Typography>
                            {/* En actumatico se pondra la fecha de fin de pago del pago mas reciente anterior 
                            o la fecha actual si no tiene pagos previos */}
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                {paymentSummary.fechaInicio}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                                Fin actual
                            </Typography>
                            {/* Se pondra la fecha de fin del pago activo actual o "Pendiente" si no tiene pago activo */}
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                {paymentSummary.fechaFin}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                                Último pago
                            </Typography>
                            {/* Se pondra el monto del pago mas reciente o "Pendiente" si no tiene pagos previos */}
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                {paymentSummary.ultimoPago}
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                <Box
                    component="form"
                    id="form-agregar-pago"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <FormControl fullWidth variant="outlined" required >
                        <InputLabel
                            id="tipo-pago-label"
                            sx={{ color: '#B0B0B0', '&.Mui-focused': { color: '#52D4A8' } }}
                        >
                            Tipo de pago
                        </InputLabel>
                        <Select
                            labelId="tipo-pago-label"
                            id="tipo-pago"
                            value={tipoPago}
                            label="Tipo de pago"
                            onChange={handleTipoChange}
                            sx={{
                                color: 'white',
                                background: 'var(--gray-dark)',
                                '& .MuiSelect-select': { padding: '14px 14px' },
                            }}
                        >
                            <MenuItem value=""><em>Seleccionar</em></MenuItem>
                            <MenuItem value={1}>Visita</MenuItem>
                            <MenuItem value={2}>Mensual</MenuItem>
                            <MenuItem value={3}>Trimestral</MenuItem>
                            <MenuItem value={4}>Anual</MenuItem>
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
                        justifyContent: 'space-between',
                    }}
                >
                    
                    <Typography variant="body" sx={{ color: 'white', fontWeight: 600,}}>
                        Monto Total:
                    </Typography>
                    <Typography variant="body" sx={{color: 'var(--mint-primary)', fontWeight: 600}}>
                        {'$1,200.00'}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                px: 3,
                pb: 2,
                pt: 2,
                gap: 1,
                }}
            >
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

                        '&:hover': {
                        background: '#333',
                        },
                    }}
                >
                    <Ban size={18} style={{ marginRight: 6 }} />
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    form="form-agregar-pago"
                    sx={{
                        background: '#52D4A8',
                        color: '#0D0D0D',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 3,

                        '&:hover': {
                        background: '#45c299',
                        },
                    }}
                >
                    <Save size={18} style={{ marginRight: 6 }} />
                    Guardar
                </Button>

            </DialogActions>

            </Dialog>
    )
}

export default AgregarPago