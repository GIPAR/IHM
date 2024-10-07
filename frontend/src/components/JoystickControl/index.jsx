import React from 'react';
import { Joystick } from 'react-joystick-component';
import { joy } from "../../services/robotController";
import { RobotInforContext } from '../../providers/robotInfor';

export default function JoystickControl(){
    const { robotInfor } = React.useContext(RobotInforContext);
    const {
        speedFactor,
      } = robotInfor;

    const handleMove = (event) => {
        const y = event.y;
        const x = event.x;
        joy(y,-x,speedFactor);
    }

    const handleStop = () => {
        joy(0,0,speedFactor);
    }

    return(
        <Joystick size={100} sticky={false} baseColor="black" stickColor="blue" move={handleMove} stop={handleStop}></Joystick>
    );
}