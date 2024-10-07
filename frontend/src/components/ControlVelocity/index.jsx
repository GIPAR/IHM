import React from 'react';
import Box from '@mui/material/Box';
import {
  Slider,
} from '@mui/material';
import { RobotInforContext } from '../../providers/robotInfor';
import { Section, Subtitle } from './style';

const marks = [
  {
    value: 1,
    label: '1 km/h',
  },
  {
    value: 3,
    label: '3 km/h',
  },
  {
    value: 5,
    label: '5 km/h',
  },
];

function valuetext(value) {
  return `${value} km/h`;
}

export default function ControlVelocity() {
  const { robotInfor, setRobotInfor } = React.useContext(RobotInforContext);
  const handleChange = ({ target }) => {
    setRobotInfor({
      ...robotInfor,
      speedFactor: target.value,
    });
  };

  return (
    <Section>
      <Box sx={{ width: 230 }}>
        <Subtitle>Speed</Subtitle>
        <Slider
          aria-label="Always visible"
          getAriaValueText={valuetext}
          step={0.5}
          max={7.5}
          marks={marks}
          value={robotInfor.speedFactor}
          onChange={handleChange}
          valueLabelDisplay="on"
        />
      </Box>
    </Section>
  );
}
