import * as React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from '@mui/material';

import { Trash, Ban, Trash2, X } from 'lucide-react';

import '../styles/Index.css';

function AlertaEliminarSocio({ open, onClose, item , onActualizar}) {

  const handleClose = () => {
    onClose(false);
  };

  const handleEliminar = () => {
    console.log('Eliminar socio:', item);
    fetch(`http://127.0.0.1:8000/api/socios/perfiles/${item.id}/`, {
        method: 'DELETE',
    })
    .then(respuesta => {
        if (respuesta.ok) {
            console.log("Socio eliminado");
            if(onActualizar) onActualizar();
            handleClose();
        } else {
            throw new Error('No se pudo eliminar');
        }
    })
    .catch(error => {
        console.error("Error al eliminar:", error);
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"

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
            // border: '1px solid var(--mint-primary)',
            border: '2px solid rgba(231, 76, 60, 0.2)',
            borderRadius: '16px',
            color: 'white',
            width: '100%',
            boxShadow: '0 10px 35px rgba(0,0,0,0.45)',
          },
        },
      }}
    >

      <DialogTitle
        id="alert-dialog-title"
        sx={{
            borderBottom: '1px solid rgba(231, 76, 60, 0.2)',
            // borderBottom: '1px solid var(--mint-primary)',
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between'
        }}
      >

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#ed9b928e',

          }}
        >
          Eliminar Socio
        </Typography>
        <Button
          onClick={handleClose}
          variant='text'
          sx={{
            color: 'white',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 700,
            px: 3,

            '&:hover': {
              background: '#333',
            },
          }}
        >
          <X size={18}  />
        </Button>

      </DialogTitle>

      <DialogContent
        sx={{
            pt: '28px !important',
            textAlign: 'center',
            // background: 'var(--gray-dark)',
        }}
      >

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'rgba(231, 76, 60, 0.12)',
              border: '1px solid rgba(231, 76, 60, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Trash
              size={42}
              color="#E74C3C"
            />
          </Box>
        </Box>

        <Typography
          id="alert-dialog-description"
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          ¿Eliminar a {item?.nombre} {item?.apellidos}?
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#B0B0B0',
            lineHeight: 1.7,
          }}
        >
          Esta acción eliminará permanentemente el registro
          del socio y no podrá recuperarse posteriormente.
        </Typography>

      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 2,
          gap: 1,
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={handleEliminar}
          sx={{
            background: '#E74C3C',
            color: 'white',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 700,
            px: 3,

            '&:hover': {
              background: '#d84333',
            },
          }}
        >
          <Trash2 size={18} style={{ marginRight: 8 }} />
          Eliminar
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AlertaEliminarSocio;