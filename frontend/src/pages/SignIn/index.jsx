import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import imageBackground from '../../assets/images/image-register.jpg';
import Axios from 'axios';
import FacialRecognition from './facial';

const theme = createTheme();
const currentURL = window.location.hostname;

const SignInSide = () => {

  const handleLogin = (values) => {
    Axios.post(`http://${currentURL}:3001/login`, {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

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
              Login
            </Typography>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={handleLogin}
              validationSchema={validationsLogin}
            >
              <Form>
                <ErrorMessage name="email" component={Alert} severity="error" />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Your email"
                  name="email"
                  autoComplete="email"
                />
                <ErrorMessage name="password" component={Alert} severity="error" />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Your password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login with email and password
                </Button>
                <Typography
                  component="h1" 
                  variant="h5"
                  align="center"
                >
                  or
                </Typography>
                <FacialRecognition />
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
