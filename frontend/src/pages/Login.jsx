import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Container,
  Alert,
} from '@mui/material';
import { Mail, Lock, Dumbbell, Leaf } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validacionLogin = Yup.object({
  correo: Yup.string()
    .trim()
    .email('Ingresa un correo electrónico válido')
    .required('El correo es obligatorio'),
  contrasena: Yup.string()
    .required('La contraseña es obligatoria'),
});

function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState('');

  const formik = useFormik({
    initialValues: { correo: '', contrasena: '' },
    validationSchema: validacionLogin,
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMsg('');
      try {
        const res = await fetch('http://127.0.0.1:8000/api/users/login/', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email: values.correo, password: values.contrasena }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.error || 'Error al iniciar sesión.');
          return;
        }

        login(data.access, data.user);
        navigate('/', { replace: true });
      } catch {
        setErrorMsg('No se pudo conectar con el servidor.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      background: 'var(--gray-dark)',
      borderRadius: '8px',
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(rgba(13, 13, 13, 0.85), rgba(13, 13, 13, 0.95)), url("/fondogym.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0D0D0D',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            background: 'linear-gradient(145deg, #1A1A1A 0%, #111111 100%)',
            border: '1px solid rgba(82, 212, 168, 0.3)',
            borderRadius: '16px',
            p: { xs: 3, sm: 5 },
            textAlign: 'center',
          }}
        >
          {/* LOGO */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ position: 'relative', width: 40, height: 40 }}>
              <Dumbbell size={32} color="#52D4A8" style={{ transform: 'rotate(-45deg)', position: 'absolute', top: 4, left: 4 }} />
              <Leaf size={16} color="#52D4A8" style={{ position: 'absolute', top: -2, right: 0 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
              GymMint
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 4 }}>
            Portal Admin - Iniciar Sesión
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
              {errorMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              name="correo"
              placeholder="Correo Electrónico"
              fullWidth
              sx={textFieldStyles}
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color="#B0B0B0" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="contrasena"
              type="password"
              placeholder="Contraseña"
              fullWidth
              sx={textFieldStyles}
              value={formik.values.contrasena}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contrasena && Boolean(formik.errors.contrasena)}
              helperText={formik.touched.contrasena && formik.errors.contrasena}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color="#B0B0B0" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              disabled={formik.isSubmitting}
              sx={{
                background: 'var(--mint-dark)',
                color: '#0D0D0D',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                py: 1.2,
                mt: 1,
                '&:hover': { background: '#45c299' },
                '&:disabled': { background: '#2a6b54', color: '#555' },
              }}
            >
              {formik.isSubmitting ? 'Entrando…' : 'Entrar'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
