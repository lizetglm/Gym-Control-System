import * as React from 'react';

import {Button,Dialog,DialogActions,DialogContent,DialogTitle,
  TextField,Typography,Box,
  Alert,} from '@mui/material';
import '../styles/Index.css'
import {Save, Ban} from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validacionSocio = Yup.object({
  nombre: Yup.string()
    .trim()
    .required('El nombre es obligatorio'),
  apellidos: Yup.string()
    .trim()
    .required('Los apellidos son obligatorios'),
  correo: Yup.string()
    .trim()
    .email('Ingresa un correo electrónico válido')
    .required('El correo es obligatorio'),
  telefono: Yup.string()
    .trim()
    .required('El teléfono es obligatorio'),
});

function AddEditSocio({ open, onClose, item, onActualizar}) {

  const handleClose = () => {
    onClose(false);
  };

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      nombre: item?.nombre || '',
      apellidos: item?.apellidos || '',
      correo: item?.correo || '',
      telefono: item?.telefono || '',
    },
    validationSchema: validacionSocio,
    
    // Formik ya te entrega los 'values' limpios y validados aquí
    onSubmit: (values) => {
      const url = item 
          ? `http://127.0.0.1:8000/api/socios/perfiles/${item.id}/` 
          : 'http://127.0.0.1:8000/api/socios/perfiles/';
          
      const metodo = item ? 'PUT' : 'POST';

      fetch(url, {
          method: metodo,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values), // Enviamos los valores validados
      })
      .then(respuesta => {
          if (!respuesta.ok) throw new Error('Error al guardar');
          return respuesta.json();
      })
      .then(datoGuardado => {
          console.log("Éxito:", datoGuardado);
          if(onActualizar) onActualizar();
          handleClose();
      })
      .catch(error => {
          console.error("Error:", error);
          <Alert severity="error">Hubo un error al guardar el socio</Alert>
      });
    },
  });

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
    '& .Mui-error fieldset': { borderColor: '#E74C3C !important' },
    '& .MuiFormHelperText-root': { color: '#E74C3C' },
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
            {item ? 'Editar Socio' : 'Agregar Socio'}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: '#B0B0B0' }}>
          Por favor, completa el formulario para agregar un nuevo socio al gimnasio.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: '24px !important' }}>
        <Box
          component="form"
          id="form-agregar-socio"
          onSubmit={formik.handleSubmit} //formik toma el control del submit
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            name="nombre"
            label="Nombre"
            fullWidth
            sx={textFieldStyles}
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
          <TextField
            name="apellidos"
            label="Apellidos"
            fullWidth
            sx={textFieldStyles}
            value={formik.values.apellidos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
            helperText={formik.touched.apellidos && formik.errors.apellidos}
          />
          <TextField
            name="correo"
            label="Correo"
            type="email"
            fullWidth
            sx={textFieldStyles}
            value={formik.values.correo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.correo && Boolean(formik.errors.correo)}
            helperText={formik.touched.correo && formik.errors.correo}
          />
          <TextField
            name="telefono"
            label="Teléfono"
            fullWidth
            sx={textFieldStyles}
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          sx={{
            background: '#2A2A2A', color: 'white', border: '1px solid #404040',
            borderRadius: '8px', textTransform: 'none', fontWeight: 700, px: 2,
            '&:hover': { background: '#333' },
          }}
        >
            <Ban size={18} style={{ marginRight: 6 }} />
            Cancelar
        </Button>

        <Button
          type="submit"
          form="form-agregar-socio"
          sx={{
            background: '#52D4A8', color: '#0D0D0D', borderRadius: '8px',
            textTransform: 'none', fontWeight: 700, px: 3,
            '&:hover': { background: '#45c299' },
          }}
        >
            <Save size={18} style={{ marginRight: 6 }} />
            Guardar
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AddEditSocio;