import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMaterial from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import imageBackground from '../../assets/images/image-register.jpg';
import { requestLogin } from '../../services/requests';
import { isValidEmail, isValidLength } from '../../helpers/validations';
import setUserDataLocalStorage from '../../helpers/dataLocalStorage';

const theme = createTheme();

export default function SignInSide() {
  const [isBadLogin, setBadLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handlerLogin = async () => {
    const userData = await requestLogin({ email, password });
    const user = {
      username: userData.username,
      lastNames: userData.lastNames,
      email: userData.email,
      role: userData.role,
    };
    setUserDataLocalStorage(user, userData.token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handlerLogin(email, password);
      navigate('/');
    } catch (error) {
      setBadLogin(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${imageBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isBadLogin && <Alert severity="warning">E-mail ou senha inválida</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Seu e-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Sua senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isValidLength(password, 6) || !isValidEmail(email)}
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register">
                    <LinkMaterial variant="body2">Não tem uma conta? Cadastre-se</LinkMaterial>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
