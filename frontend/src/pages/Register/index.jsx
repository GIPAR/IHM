import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imageBackground from '../../assets/images/silla-de-ruedas.jpg';
import { isValidEmail, isValidLength } from '../../helpers/validations';
import { requestCreateUser } from '../../services/requests';
import setUserDataLocalStorage from '../../helpers/dataLocalStorage';

const theme = createTheme();

export default function Register() {
  const [username, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isBadRegister, setBadRegister] = useState(false);

  const navigate = useNavigate();

  const isValidPassword = () => isValidLength(password, 5) && password === passwordConf;
  const isValidDataUser = () => (
    isValidLength(username, 3)
    && isValidLength(lastName, 3)
    && isValidEmail(email)
    && isValidPassword()
    && isChecked
  );

  const createUser = async () => {
    const user = {
      username,
      lastName,
      email,
      password,
      role: 'user',
    };

    const token = await requestCreateUser(user);
    delete user.password;
    setUserDataLocalStorage(user, token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser();
      navigate('/');
    } catch (error) {
      setBadRegister(true);
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
          md={5}
          sx={{
            backgroundImage: `url(${imageBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
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
              Cadastrar-se
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nome"
                    autoFocus
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                  />
                  { !isValidLength(username, 3) && <Alert severity="warning">Mínimo 3 caracteres</Alert>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Sobrenome"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  { !isValidLength(lastName, 3) && <Alert severity="warning">Mínimo 3 caracteres</Alert>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Seu e-mail"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isValidEmail(email) && <Alert severity="error">E-mail inválido</Alert>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Sua senha"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  { !isValidLength(password, 6) && <Alert severity="warning">Mínimo 6 caracteres</Alert>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirme sua senha"
                    type="password"
                    id="confirm-password"
                    autoComplete="new-password"
                    value={passwordConf}
                    onChange={(e) => setPasswordConf(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        checked={isChecked}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                    )}
                    label="Eu li e concordo com os termos de uso."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isValidDataUser()}
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
              { isBadRegister && <Alert severity="error">Erro no cadastro, verifique se seu e-mail já não cadastrado</Alert>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}