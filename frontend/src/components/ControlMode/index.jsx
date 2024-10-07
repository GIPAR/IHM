import React from 'react';
import {
  FormControl,
  FormLabel, Radio,
  RadioGroup,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RobotInforContext } from '../../providers/robotInfor';
import Section from './style';

export default function ControlMode() {
  const { robotInfor, setRobotInfor } = React.useContext(RobotInforContext);
  const { controlMode } = robotInfor;

  const handleChange = (event) => {
    setRobotInfor({ ...robotInfor, controlMode: event.target.value });
  };

  return (
    <Section>
      <FormControl>
        <FormLabel id="wheelchair-controlled-radio-buttons-group">
          Wheelchair control
        </FormLabel>
        <RadioGroup
          aria-labelledby="wheelchair-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={controlMode}
          onChange={handleChange}
        >
          <FormControlLabel value="manual" control={<Radio />} label="Manual" />
          <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
          <FormControlLabel value="autonomous" control={<Radio />} label="Autonomous" />
        </RadioGroup>
      </FormControl>
    </Section>
  );
}
