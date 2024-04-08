import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import BatteryGauge from 'react-battery-gauge';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Drawer } from './style';
import Home from '../Home';
import Register from '../Register';
import SignInSide from '../SignIn';
import { mainListItems, secondaryListItems } from '../../components/ListItems';
import ControllerRobot from '../ControllerRobot';
import Maintenance from '../Maintenance';
import DataRobot from '../DataRobot';
import About from '../About';
import Subscriber from '../../components/Subscriber';

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [batteryValue, setBatteryValue] = React.useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const BatteryValue = (newValue) => {
    setBatteryValue(newValue);
  };

  React.useEffect(() => {
    // get value of window width
    const widthWindow = window.innerWidth;
    const minWidth = 750;
    if (widthWindow < minWidth) setOpen(false);
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Nara Tecnologia
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: [1],
            }}
          >
            <div style={{ marginLeft: '70px' }}>
              <BatteryGauge value={batteryValue} size={100} animated />
              <Subscriber topic="/battery" messageType="std_msgs/Int32" onMessage={BatteryValue} />
            </div>
            <div style={{ marginLeft: '35px' }}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/register" element={<Register />} />
            <Route path="/controllers" element={<ControllerRobot />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/data" element={<DataRobot />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
