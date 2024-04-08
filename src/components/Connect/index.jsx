import React from 'react';
import {
  FormControl, Input, InputAdornment, InputLabel,
} from '@mui/material';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import SensorsIcon from '@mui/icons-material/Sensors';
import Button from '@mui/material/Button';
import { connect, closeConnection } from '../../services/robotController';
import { RobotInforContext } from '../../providers/robotInfor';
import Container from './style';

import perceptionData from '../../services/mocks/perceptionClasse';

export default function Connect() {
  const { robotInfor, setRobotInfor } = React.useContext(RobotInforContext);
  const obeject = perceptionData.people.name;

  const currentURL = window.location.hostname;

  React.useEffect(() => {
    if (currentURL === 'localhost') {
      setRobotInfor({
        ...robotInfor,
        robotUrl: 'ws://127.0.0.1:9090',
      });
    } else {
      setRobotInfor({
        ...robotInfor,
        robotUrl: `ws://${currentURL}:9090`,
      });
    }
  }, []);

  const handlerConnect = () => {
    if (!robotInfor.isConnected) {
      connect(robotInfor.robotUrl);
      setRobotInfor({
        ...robotInfor,
        isConnected: true,
        objectDetected: obeject,
        proxemicZone: 'personal',
      });
    } else {
      closeConnection();
      setRobotInfor({
        ...robotInfor,
        isConnected: false,
        objectDetected: undefined,
        proxemicZone: undefined,
      });
    }
  };

  return (
    <Container>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Conexão com a cadeira de rodas
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          value={robotInfor.robotUrl}
          startAdornment={(
            <InputAdornment position="start">
              {
                !robotInfor.isConnected ? <SensorsOffIcon color="error" /> : <SensorsIcon color="success" />
              }
            </InputAdornment>
        )}
        />
      </FormControl>
      <div>
        <Button
          variant="contained"
          color={robotInfor.isConnected ? 'error' : 'success'}
          size="medium"
          style={{ marginLeft: '0.8rem' }}
          onClick={handlerConnect}
        >
          {robotInfor.isConnected ? 'Desconectar' : 'Conectar'}
        </Button>
      </div>
    </Container>
  );
}
