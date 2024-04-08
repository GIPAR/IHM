import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Title,
  Wrapper,
} from './style';
import { RobotInforProvider } from '../../providers/robotInfor';
import ShowDataTopics from '../../components/ShowDataTopics';

const theme = createTheme();

export default function Maintenance() {
  return (
    <RobotInforProvider>
      <ThemeProvider theme={theme}>
        <Box>
          <Grid container component="main">
            <Title>Módulo de Manutenção</Title>
          </Grid>
          <Wrapper>
            <ShowDataTopics />
          </Wrapper>
        </Box>
      </ThemeProvider>
    </RobotInforProvider>
  );
}
