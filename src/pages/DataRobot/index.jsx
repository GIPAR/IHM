import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Chip, Stack } from '@mui/material';
import {
  Title, GridStyled, Paragraph, ImageStyled,
} from './style';
import { RobotInforProvider } from '../../providers/robotInfor';
import Chave from '../../components/Switch';
import a2 from '../../assets/images/a2.png';
import zed from '../../assets/images/zed2.png';
import cam from '../../assets/images/cam.png';
import gprox from '../../assets/images/Logo-GProxemicNavigations.png';
import nara from '../../assets/images/favicon.png';
import Subscriber from '../../components/Subscriber';
import CamViewer from '../../components/CamViewer';

const theme = createTheme();

export default function DataRobot() {
  const [camStatus, setcamStatus] = React.useState('OFFLINE');
  const [lidarStatus, setLidarStatus] = React.useState('OFFLINE');

  const handleCamStatus = (newStatus) => {
    if (newStatus === null) {
      setcamStatus('OFFLINE');
    } else {
      setcamStatus('ONLINE');
    }
  };

  const handleLidarStatus = (newStatus) => {
    if (newStatus === null) {
      setLidarStatus('OFFLINE');
    } else {
      setLidarStatus('ONLINE');
    }
  }

  return (
    <RobotInforProvider>
      <ThemeProvider theme={theme}>
        <Box>
          <GridStyled>
            <Title>Dados</Title>
            <AppBar position="static">
              <Toolbar
                variant="dense"
                style={{
                  background: '#1d2ec2',
                }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Informações
                </Typography>
              </Toolbar>
            </AppBar>
            <Paragraph>Cadeira B400</Paragraph>
            <Paragraph>ROS Noetic</Paragraph>
            <Paragraph>Modelo do dispositivo</Paragraph>
            <AppBar position="static">
              <Toolbar
                variant="dense"
                style={{
                  background: '#1d2ec2',
                }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Sistemas
                </Typography>
              </Toolbar>
            </AppBar>
            <Stack direction="row" spacing={30} paddingTop="15px" marginLeft="50px" marginRight="50px">
              <Stack direction="column" spacing={1} alignItems="center">
                <Chave />
                <ImageStyled
                  src={gprox}
                  alt="gprox"
                  style={{
                    width: '400px',
                    scale: '0.5',
                  }}
                />
              </Stack>
              <Stack direction="column" spacing={1} alignItems="center">
                <Chave />
                <ImageStyled src={nara} alt="logo_nara" />
              </Stack>
            </Stack>
            <AppBar position="static">
              <Toolbar
                variant="dense"
                style={{
                  background: '#1d2ec2',
                }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Componentes / Sensores
                </Typography>
              </Toolbar>
            </AppBar>
            <Stack direction="row" spacing={30} paddingTop="15px" marginLeft="50px" marginRight="50px">
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography align="center" variant="h6" color="inherit">LIDAR</Typography>
                <Chip label={lidarStatus} color={lidarStatus === 'ONLINE' ? 'success' : 'error'} />
                <Subscriber topic="/scan" messageType="sensor_msgs/LaserScan" onMessage={handleLidarStatus} />
                <ImageStyled src={a2} alt="lidar" />
              </Stack>
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography align="center" variant="h6" color="inherit">ZED 2</Typography>
                <Chip label="OFFLINE" color="error" />
                <ImageStyled
                  src={zed}
                  alt="zed"
                  style={{
                    width: '300px',
                    scale: '0.5',
                  }}
                />
              </Stack>
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography align="center" variant="h6" color="inherit">USER CAM</Typography>
                <Chip label={camStatus} color={camStatus === 'ONLINE' ? 'success' : 'error'} />
                <Subscriber topic="/usb_cam/image_raw" messageType="sensor_msgs/Image" onMessage={handleCamStatus} />
                <ImageStyled src={cam} alt="webcam" />
                <CamViewer topic="/usb_cam/image_raw/compressed" />
              </Stack>
            </Stack>
          </GridStyled>
        </Box>
      </ThemeProvider>
    </RobotInforProvider>
  );
}
