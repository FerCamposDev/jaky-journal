import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import GoogleIcon from 'Assets/Icons/GoogleIcon';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/lab/LoadingButton';
import { auth } from 'fb/client';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useColorMode } from '../contexts/ColorModeContext';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Jackie Journal
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

function IniciarSesion() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const [cargando, modificarVariableCargando] = useState(false);
  const router = useRouter();

  const tema = useColorMode();

  async function iniciar() {
    modificarVariableCargando(true);
    await signInWithGoogle();
    modificarVariableCargando(false);
  }

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t: any) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box sx={{ mt: 1 }}>

            <Button
              // color="inherit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => iniciar()}
              loading={cargando}
            >
              <div style={{ width: '40px', margin: '8px 20px' }}>
                <GoogleIcon />
              </div>
              Continuar con Google
            </Button>

            <span>{tema.mode}</span>
            <button onClick={tema.toggleColorMode}>Cambiar tema</button>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default IniciarSesion;
