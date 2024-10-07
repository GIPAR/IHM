import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from '@mui/material';

import { Container, DirectionalButton, Section } from './style';
import { RobotInforContext } from '../../providers/robotInfor';

import {
  arrowDown, arrowLeft, arrowRight, arrowUp,
} from '../../services/robotController';

export default function DirectionalButtons() {
  const { robotInfor } = React.useContext(RobotInforContext);

  const {
    speedFactor,
    linearSpeed,
    angularSpeed,
    controlMode,
  } = robotInfor;

  const [timerId, setTimerId] = React.useState(0);

  const handlerStop = () => {
    clearInterval(timerId);
  };

  const handlerArrowUp = () => {
    if (controlMode === 'manual') {
      arrowUp(linearSpeed, speedFactor);
    } else if (controlMode === 'automatic') {
      handlerStop();
      const intervalId = window.setInterval(() => {
        arrowUp(linearSpeed, speedFactor);
      }, 500);
      setTimerId(intervalId);
    }
  };

  const handlerArrowDown = () => {
    if (controlMode === 'manual') {
      arrowDown(linearSpeed, speedFactor);
    } else if (controlMode === 'automatic') {
      handlerStop();
      const intervalId = window.setInterval(() => {
        arrowDown(linearSpeed, speedFactor);
      }, 500);
      setTimerId(intervalId);
    }
  };

  const handlerArrowLeft = () => {
    if (controlMode === 'manual') {
      arrowLeft(angularSpeed, speedFactor);
    } else if (controlMode === 'automatic') {
      handlerStop();
      const intervalId = window.setInterval(() => {
        arrowLeft(angularSpeed, speedFactor);
      }, 500);
      setTimerId(intervalId);
    }
  };

  const handlerArrowRight = () => {
    if (controlMode === 'manual') {
      arrowRight(angularSpeed, speedFactor);
    } else if (controlMode === 'automatic') {
      handlerStop();
      const intervalId = window.setInterval(() => {
        arrowRight(angularSpeed, speedFactor);
      }, 500);
      setTimerId(intervalId);
    }
  };

  const alignButtonsStyle = {
    marginLeft: '2.8rem',
  };
  return (
    <Container>
      <div className="section-arrows">
        <DirectionalButton
          type="button"
          style={alignButtonsStyle}
          onClick={handlerArrowUp}
        >
          <ArrowUpwardIcon />
        </DirectionalButton>
        <Section>
          <DirectionalButton
            type="button"
            onClick={handlerArrowLeft}
          >
            <ArrowBackIcon />
          </DirectionalButton>
          <CircleIcon
            style={{ fontSize: '2.5rem', margin: '0.3rem' }}
          />
          <DirectionalButton
            type="button"
            onClick={handlerArrowRight}
          >
            <ArrowForwardIcon />
          </DirectionalButton>
        </Section>
        <DirectionalButton
          type="button"
          style={alignButtonsStyle}
          onClick={handlerArrowDown}
        >
          <ArrowDownwardIcon />
        </DirectionalButton>
      </div>
      <div className="stop-btn">
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={handlerStop}
        >
          Stop
        </Button>
      </div>
    </Container>
  );
}
