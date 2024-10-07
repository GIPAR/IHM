import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ROSLIB from 'roslib';

function Subscriber({ topic, messageType, onMessage }) {
  const currentURL = window.location.hostname;
  const ros = new ROSLIB.Ros({ url: `ws://${currentURL}:9090` });
  const subscriber = new ROSLIB.Topic({
    ros,
    name: topic,
    messageType,
  });

  useEffect(() => {
    const handleMessage = (msg) => {
      onMessage(msg.data);
    };

    subscriber.subscribe(handleMessage);
    return () => {
      subscriber.unsubscribe();
    };
  }, [onMessage]);

  return null;
}

Subscriber.propTypes = {
  topic: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
  onMessage: PropTypes.number.isRequired,
};

export default Subscriber;
