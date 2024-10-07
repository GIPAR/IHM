import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ROSLIB from 'roslib';

export default function CamViewer({ topic }) {
  const canvasRef = useRef(null);
  const currentURL = window.location.hostname;
  const ros = new ROSLIB.Ros({ url: `ws://${currentURL}:9090` });
  const camTopic = new ROSLIB.Topic({
    ros,
    name: topic,
    messageType: 'sensor_msgs/CompressedImage',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleMessage = (msg) => {
      const base64Data = msg.data;
      const binary = atob(base64Data);
      const { length } = binary;
      const byteArray = new Uint8Array(length);
      for (let i = 0; i < length; i += 1) {
        byteArray[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    camTopic.subscribe(handleMessage);

    return () => {
      camTopic.unsubscribe();
    };
  }, [topic]);

  return (
    <canvas ref={canvasRef} width="300" height="300" />
  );
}

CamViewer.propTypes = {
  topic: PropTypes.string.isRequired,
};
