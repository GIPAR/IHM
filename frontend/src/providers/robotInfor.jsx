import React from 'react';
import PropTypes from 'prop-types';

export const RobotInforContext = React.createContext();

export function RobotInforProvider({ children }) {
  const [robotInfor, setRobotInfor] = React.useState({
    isConnected: false,
    topicName: '/cmd_vel', // topic name for the UR robots
    speedFactor: 3.0, // multiplies or divides speed to go faster or slower
    linearSpeed: 0.5,
    angularSpeed: 1.0, // initial speed
    linearRepeat: 1,
    angularRepeat: 1, // number of times to repeat command
    repeatInterval: 500, // wait time between repeats, in ms
    stopMotion: true,
    robotUrl: 'ws://127.0.0.1:9090',
    controlMode: 'manual',
    objectDetected: undefined,
    proxemicZone: undefined,
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <RobotInforContext.Provider value={{ robotInfor, setRobotInfor }}>
      {children}
    </RobotInforContext.Provider>
  );
}

RobotInforProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
