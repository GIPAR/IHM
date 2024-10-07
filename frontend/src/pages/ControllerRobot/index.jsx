import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ControlMode from '../../components/ControlMode';
import ControlVelocity from '../../components/ControlVelocity';
import DirectionalButtons from '../../components/DirectionalButtons';
import JoystickControl from '../../components/JoystickControl';
import Connect from '../../components/Connect';
import ChatBot from "react-chatbotify";
import chatIcon from '../../assets/images/logo1.png';
import bot from '../../assets/images/chatbot.png';
import { RobotInforProvider, RobotInforContext } from '../../providers/robotInfor';
import ObejectDetected from '../../components/ObjectDetected';
import ProxemicZone from '../../components/ProxemicZone';
import { Section, Title } from './style';
import Autonomous from '../../components/Navigation';
import axios from 'axios';
const theme = createTheme();

export default function ControllerRobot() {

  const [form, setForm] = useState({});
  const currentURL = window.location.hostname;

  const options = {
    isOpen: false,
    theme: {
      primaryColor: '#EAA134',
      secondaryColor: '#EAA134',
      fontFamily: 'Arial, sans-serif',
    },
    userBubbleStyle: {
      color: "black"
    },
    voice: {
      disabled: false,
      timeoutPeriod: 5000,
    },
    audio: {
      disabled: false,
      defaultToggledOn: true,
      language: 'en-US',
      voiceNames: 'Microsoft David - English (United States)',
    },
    header: {
      title: "NARA",
      avatar: bot,
    },
    chatButton: {
      icon: chatIcon,
    },
    tooltip: {
      mode: "NEVER",
    },
    botBubble: {
      simStream: true,
    }
  };

  const flow = {
    start: {
      function: async (params) => {
        const response = await axios.post(`http://${currentURL}:3001/goal`, {
          input: params.userInput,
        });
        setForm({ ...form, chat: response.data });
        await params.injectMessage(`${response.data}`);
      },
      path: "start"
    }
  }

  return (
    <RobotInforProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Title>Control Module</Title>
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
                <ControlledComponent />
              </Grid>
            </Section>
          </Grid>
          <ChatBot options={options} flow={flow} />
        </Box>
      </ThemeProvider>
    </RobotInforProvider>
  );
}

function ControlledComponent() {
  const { robotInfor, setRobotInfor } = React.useContext(RobotInforContext);
  const { controlMode } = robotInfor;

  return controlMode === 'manual' ? (
    <JoystickControl />
  ) : controlMode === 'automatic' ? (
    <DirectionalButtons />
  ) : (
    <Autonomous />
  );
}
