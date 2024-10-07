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
  const [zedStatus, setZedStatus] = React.useState('OFFLINE');

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

  const handleZedStatus = (newStatus) => {
    if (newStatus === null) {
      setZedStatus('OFFLINE');
    } else {
      setZedStatus('ONLINE');
    }
  }

  return (
    <RobotInforProvider>
      <ThemeProvider theme={theme}>
        <Box>
          <GridStyled>
            <Title>Data</Title>
            <AppBar position="static">
              <Toolbar
                variant="dense"
                style={{
                  background: '#1d2ec2',
                }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Information
                </Typography>
              </Toolbar>
            </AppBar>
            <Paragraph>Ottobock B400 wheelchair</Paragraph>
            <Paragraph>ROS Noetic</Paragraph>
            <Paragraph>Device model: Samsung Galaxy Tab S6 Lite</Paragraph>
            <Paragraph>Battery Voltage:</Paragraph>
            <AppBar position="static">
              <Toolbar
                variant="dense"
                style={{
                  background: '#1d2ec2',
                }}
              >
                <Typography variant="h6" color="inherit" component="div">
                  Systems
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
                  Components / Sensors
                </Typography>
              </Toolbar>
            </AppBar>
            <Stack direction="row" spacing={12} paddingTop="15px" marginLeft="30px" marginRight="30px">
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography align="center" variant="h6" color="inherit">LIDAR</Typography>
                <Chip label={lidarStatus} color={lidarStatus === 'ONLINE' ? 'success' : 'error'} />
                <Subscriber topic="/scan" messageType="sensor_msgs/LaserScan" onMessage={handleLidarStatus} />
                <ImageStyled src={a2} alt="lidar" />
              </Stack>
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography align="center" variant="h6" color="inherit">ZED 2i</Typography>
                <Chip label={zedStatus} color={zedStatus === 'ONLINE' ? 'success' : 'error'} />
                <Subscriber topic="/zed2i/zed_node/rgb_raw/image_raw_color" messageType="sensor_msgs/Image" onMessage={handleZedStatus} />
                <ImageStyled
                  src={zed}
                  alt="zed"
                  style={{
                    width: '300px',
                    scale: '0.5',
                  }}
                />
                <CamViewer topic="/zed2i/zed_node/rgb_raw/image_raw_color/compressed" />
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
