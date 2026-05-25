import * as React from 'react';

import {Button,Dialog,DialogActions,DialogContent,DialogTitle,
  TextField,Typography,Box,} from '@mui/material';
import '../styles/Index.css'
import {Save, CornerDownLeft, Ban} from 'lucide-react'

function AddEditSocio({ open, onClose, item}) {

  const handleClose = () => {
    onClose(false);
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

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      background: 'var(--gray-dark)',

      '& fieldset': {
        borderColor: '#404040',
      },

      '&:hover fieldset': {
        borderColor: '#52D4A8',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#52D4A8',
      },
    },

    '& .MuiInputLabel-root': {
      color: '#B0B0B0',
    },

    '& .MuiInputLabel-root.Mui-focused': {
      color: '#52D4A8',
    },
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
            {item ? 'Editar Socio' : 'Agregar Socio'}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: '#B0B0B0',
          }}
        >
          Por favor, completa el formulario para agregar un nuevo socio al gimnasio.
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: '24px !important',
        }}
      >
        <Box
          component="form"
          id="form-agregar-socio"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            required
            name="nombre"
            label="Nombre"
            fullWidth
            sx={textFieldStyles}
            defaultValue={item?.nombre || ''}
          />
          <TextField
            required
            name="apellidos"
            label="Apellidos"
            fullWidth
            sx={textFieldStyles}
            defaultValue={item?.apellidos || ''}
          />
          <TextField
            required
            name="correo"
            label="Correo"
            type="email"
            fullWidth
            sx={textFieldStyles}
            defaultValue={item?.email || ''}
          />
          <TextField
            required
            name="telefono"
            label="Teléfono"
            fullWidth
            sx={textFieldStyles}
            defaultValue={item?.telefono || ''}
          />

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
          form="form-agregar-socio"
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
  );
}

export default AddEditSocio;