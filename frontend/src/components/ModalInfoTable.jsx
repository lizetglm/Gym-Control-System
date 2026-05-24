import { Box, Button, Typography, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { X } from 'lucide-react';

function ModalInfoTable({ open, title, item, fields = [], actions = [], onClose }) {
  if (!open || !item) return null;

  const resolveActionStyles = (variant) => {
    switch (variant) {
      case 'danger':
        return {
          variant: 'contained',
          sx: {
            background: '#E74C3C',
            color: 'white',

            '&:hover': {
              background: '#c0392b',
            },
          },
        };
      case 'warning':
        return {
          variant: 'contained',
          sx: {
            background: '#F39C12',
            color: 'black',

            '&:hover': {
              background: '#d68910',
            },
          },
        };
      case 'primary':
        return {
          variant: 'contained',
          sx: {
            background: '#52D4A8',
            color: '#0D0D0D',

            '&:hover': {
              background: '#45c299',
            },
          },
        };
      default:
        return {
          variant: 'contained',
          sx: {
            background: '#2A2A2A',
            color: 'white',
            border: '1px solid #404040',

            '&:hover': {
              background: '#333',
            },
          },
        };
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"

      sx={{
        '& .MuiBackdrop-root': {
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(1px)',
        },
      }}

      slotProps={{
        paper: {
          sx: {
            background: 'var(--gray-darkest)',
            border: '1px solid var(--mint-primary)',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            overflow: 'hidden',

            '&::-webkit-scrollbar': {
              width: '8px',
            },

            '&::-webkit-scrollbar-thumb': {
              background: 'var(--mint-primary)',
              borderRadius: '10px',
            },
          },
        },
      }}
    >

      <DialogTitle
        sx={{
          borderBottom: '1.5px solid rgba(82, 212, 168, 0.35)',
          pb: 2,
          background: '#151515',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'var(--mint-primary)',
          }}
        >
          {title}
        </Typography>
        <Button
          variant="text"
          onClick={onClose}

          sx={{
            color: 'white',

            '&:hover': {
              background: '#333',
            },
          }}
        >
          
          <X size={20} />
        </Button>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: 3,
          px: 3,
          mt: 2,
        }}
      >
        <Stack >

          {fields.map((field) => {

            const value = typeof field.value === 'function'
              ? field.value(item)
              : field.value ?? item[field.key];

            return (
              <Box
                key={field.key ?? field.label}
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },

                  gap: 1,
                  py: 1,
                }}
              >

                <Typography
                  variant="caption"
                  sx={{
                    color: '#B0B0B0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,

                    width: {
                      sm: '120px',
                    },
                  }}
                >
                  {field.label}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    wordBreak: 'break-word',
                  }}
                >
                  {value ?? '—'}
                </Typography>

              </Box>
            );
          })}

        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 2,
          gap: 1,
          flexWrap: 'wrap',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >

        {actions.map((action, index) => {

          const style = resolveActionStyles(action.variant);
          const actionLabel = action.labelText ?? action.label;

          return (
            <Button
              key={action.id ?? actionLabel ?? index}
              {...style}
              onClick={() => action.onClick(item)}
              sx={{
                borderRadius: '6px',
                fontWeight: 600,
                textTransform: 'none',
                px: 2,
                py: 1,
                transition: '0.2s',

                '&:hover': {
                  transform: 'translateY(-1px)',
                },

                ...style.sx,
              }}
            >
              {action.icon ? <Box component="span" sx={{ display: 'inline-flex', mr: 1 }}>{action.icon}</Box> : null}
              {actionLabel}
            </Button>
          );
        })}

        

      </DialogActions>

    </Dialog>
  );
}

export default ModalInfoTable;