import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../assets/images/logo.png';
import Chatbot from '../../components/Chatbot';
import {
  GridStyled, ImageStyled,
} from './style';

const theme = createTheme();

// ref: https://codesandbox.io/s/x2zto?file=/src/App.js:5625-5638
export default function Home() {
  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    if (document.getElementById('name-login') && isLogged) window.location.reload();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <GridStyled>
          <CssBaseline />
          <ImageStyled src={logo} alt="Nara Tecnologia" />
        </GridStyled>
        <Chatbot link="https://console.dialogflow.com/api-client/demo/embedded/d71c0d07-a3bd-43e6-95a9-6367447a1f8e" />
      </Box>
    </ThemeProvider>
  );
}
