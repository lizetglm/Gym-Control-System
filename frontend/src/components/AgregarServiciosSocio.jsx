import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './AgregarServiciosSocio.css';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AgregarServiciosSocio({open,onClose,item}) {
    const handleClose = () => {
        onClose(false);
    };

    const clases = ['Yoga', 'Spinning', 'Pilates', 'Pesas'];

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            className="agregarServiciosDialog"
            PaperProps={{ className: 'agregarServiciosPaper' }}
            slots={{
            transition: Transition,
            }}
        >
            <AppBar position="sticky" elevation={0} className="agregarServiciosAppBar">
                <Toolbar className="agregarServiciosToolbar">
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    className="agregarServiciosCloseButton"
                    >
                        <span aria-hidden="true">×</span>
                    </IconButton>
                    <Typography variant="h6" component="div" className="agregarServiciosTitle">
                        Agregar Servicios al Socio
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose} className="agregarServiciosSaveButton">
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent className="agregarServiciosContent" dividers>
                <Box className="agregarServiciosLayout">
                    <Paper className="agregarServiciosCard agregarServiciosResumenCard" elevation={0}>
                        <Typography variant="overline" className="agregarServiciosEyebrow">
                            Socio seleccionado
                        </Typography>
                        <Typography variant="h5" component="h2" className="agregarServiciosMemberName">
                            {item?.nombre} {item?.apellido}
                        </Typography>
                        <Typography variant="body2" className="agregarServiciosMemberMeta">
                            {item?.email}
                        </Typography>
                        <Typography variant="body2" className="agregarServiciosMemberMeta">
                            {item?.telefono}
                        </Typography>
                    </Paper>

                    <Paper className="agregarServiciosCard" elevation={0}>
                        <Typography variant="h6" component="h3" className="agregarServiciosSectionTitle">
                            Membresía y fechas
                        </Typography>

                        <Box className="agregarServiciosFormGrid">
                            <InputLabel id="membresia-label">Tipo de membresía</InputLabel>
                            <FormControl fullWidth size="small">
                                <Select labelId="membresia-label" label="Tipo de membresía" defaultValue="visita">
                                    <MenuItem value="visita">Visita</MenuItem>
                                    <MenuItem value="mensual">Mensual</MenuItem>
                                    <MenuItem value="anual">Anual</MenuItem>
                                </Select>
                            </FormControl>
                            <InputLabel>Fecha de inicio</InputLabel>
                            <TextField fullWidth size="small" type="date" InputLabelProps={{ shrink: true }} />
                            <InputLabel>Fecha de fin</InputLabel>
                            <TextField fullWidth size="small" type="date" InputLabelProps={{ shrink: true }} />
                        </Box>
                    </Paper>

                    <Paper className="agregarServiciosCard" elevation={0}>
                        <Typography variant="h6" component="h3" className="agregarServiciosSectionTitle">
                            Clases disponibles
                        </Typography>

                        <FormGroup className="agregarServiciosCheckboxGrid">
                            {clases.map((clase) => (
                                <FormControlLabel
                                    key={clase}
                                    control={<Checkbox defaultChecked={clase === 'Yoga'} />}
                                    label={clase}
                                />
                            ))}
                        </FormGroup>
                    </Paper>

                    <Paper className="agregarServiciosCard agregarServiciosTotalCard" elevation={0}>
                        <Typography variant="overline" className="agregarServiciosEyebrow">
                            Resumen
                        </Typography>
                        <Typography variant="h5" component="p" className="agregarServiciosTotal">
                            Monto total a pagar: $500
                        </Typography>
                    </Paper>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AgregarServiciosSocio