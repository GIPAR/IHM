import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ControlMode from '../../components/ControlMode';
import ControlVelocity from '../../components/ControlVelocity';
import DirectionalButtons from '../../components/DirectionalButtons';
import Connect from '../../components/Connect';
import Chatbot from '../../components/Chatbot';
import { RobotInforProvider } from '../../providers/robotInfor';
import ObejectDetected from '../../components/ObjectDetected';
import ProxemicZone from '../../components/ProxemicZone';
import { Section, Title } from './style';

const theme = createTheme();

export default function ControllerRobot() {
  return (
    <RobotInforProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Title>Módulo de Controle</Title>
          </Grid>
          <Grid container spacing={2}>
            <Section>
              <Grid xs={12}>
                <Connect />
              </Grid>
              <ProxemicZone zone="personal" />
              <Grid xs={12} className="items-inlined">
                <ControlMode />
                <ControlVelocity />
                <ObejectDetected />
              </Grid>
              <Grid xs={12} md={6}>
                <DirectionalButtons />
              </Grid>
            </Section>
          </Grid>
          <Chatbot
            isController="true"
            link="https://console.dialogflow.com/api-client/demo/embedded/c9cece23-7716-4863-a8a0-a7990d3d137c"
          />
        </Box>
      </ThemeProvider>
    </RobotInforProvider>
  );
}
