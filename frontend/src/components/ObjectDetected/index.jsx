import React from 'react';
import { RobotInforContext } from '../../providers/robotInfor';

import { Container, Subtitle } from './style';

export default function ObjectDetected() {
  const { robotInfor } = React.useContext(RobotInforContext);
  const { objectDetected } = robotInfor;

  const showObjectDetected = (proxemicZoneCurrent) => {
    if (proxemicZoneCurrent === 'person') {
      return 'Person';
    }
    return 'Unknown';
  };

  return (
    <Container>
      <Subtitle>Detected</Subtitle>
      <p>{ showObjectDetected(objectDetected) }</p>
    </Container>
  );
}
