import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import BarChartIcon from '@mui/icons-material/BarChart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import GamepadIcon from '@mui/icons-material/Gamepad';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const linkStyle = {
  textDecoration: 'none',
  display: 'flex',
  color: '#202020',
  alignItems: 'center',
  justifyContent: 'center',
};

const typeUser = (userRole) => {
  if (userRole === 'user') return 'Normal';
  if (userRole === 'admin') return 'Administrador';
  return 'Desconhecido';
};

const isLogged = JSON.parse(localStorage.getItem('isLogged'));
let name;
let type;

if (isLogged) {
  const user = JSON.parse(localStorage.getItem('user'));
  name = user.username;
  type = typeUser(user.role);
}

const handlerLogout = () => {
  localStorage.clear();
  localStorage.setItem('isLogged', false);
  window.location.reload();
};
export const mainListItems = (
  <>
    <ListItemButton>
      <Link to="/" style={linkStyle}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </Link>
    </ListItemButton>
    {/* {isLogged && ( */}
    <>
      <ListItemButton>
        <Link to="/controllers" style={linkStyle}>
          <ListItemIcon>
            <GamepadIcon />
          </ListItemIcon>
          <ListItemText primary="Controls" />
        </Link>
      </ListItemButton>
      {/* {type === 'Administrador' && ( */}
      <ListItemButton>
        <Link to="/maintenance" style={linkStyle}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Maintenance" />
        </Link>
      </ListItemButton>
      {/* )} */}
      <ListItemButton>
        <Link to="/data" style={linkStyle}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Data" />
        </Link>
      </ListItemButton>
    </>
    {/* )} */}
    <ListItemButton>
      <a href="https://www.instagram.com/giparvca/" target="_blank" style={linkStyle} rel="noreferrer">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Meet GIPAR" />
      </a>
    </ListItemButton>
    <ListItemButton>
      <Link to="/about" style={linkStyle}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </Link>
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
    User data
    </ListSubheader>
    { !isLogged ? (
      <ListItemButton>
        <Link id="name-login" to="/login" style={linkStyle}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </Link>
      </ListItemButton>
    ) : (
      <>
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary={type} />
        </ListItemButton>
        <ListItemButton>
          <Link to="/" onClick={handlerLogout} style={linkStyle}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </Link>
        </ListItemButton>
      </>

    )}
  </>
);
