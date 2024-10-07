import { Button } from '@mui/material';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function FacialRecognition() {
  const [cameraOn, setCameraOn] = useState(false);
  const [imageSent, setImageSent] = useState(false);
  const currentURL = window.location.hostname;

  useEffect(() => {
    if (cameraOn) {
      const startVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          const videoFeedEl = document.getElementById('video-feed');
          videoFeedEl.srcObject = stream;

          videoFeedEl.addEventListener('loadeddata', async () => {
            const canvasOverlay = document.getElementById('overlay');
            const context = canvasOverlay.getContext('2d');

            const adjustCanvasSize = () => {
              canvasOverlay.width = videoFeedEl.clientWidth;
              canvasOverlay.height = videoFeedEl.clientHeight;
            };

            adjustCanvasSize();
            window.addEventListener('resize', adjustCanvasSize);

            const detectAndDraw = async () => {
              context.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

              context.drawImage(videoFeedEl, 0, 0, canvasOverlay.width, canvasOverlay.height);
              const image = canvasOverlay.toDataURL("image/jpeg", 0.5);

              try {
                const response = await Axios.post(`http://${currentURL}:3001/facial`, {
                  image: image,
                });

                const { results, box } = response.data;

                if (box) {
                  context.strokeStyle = 'red';
                  context.lineWidth = 4;
                  context.strokeRect(box._x, box._y, box._width, box._height);

                  context.fillStyle = 'red';
                  context.font = 'bold 26px Arial';
                  context.fillText(results, box._x, box._y - 10);
                }
                

                if (results && results !== 'Unknown') {
                  clearInterval(intervalId);
                  setImageSent(true);
                }

              } catch (error) {
                console.error('Error sending image to backend', error);
              }
            };
            
            detectAndDraw();
            const intervalId = setInterval(detectAndDraw, 1000);

          });
        } catch (error) {
          console.error('Error accessing the camera', error);
        }
      };

      startVideo();
    }
  }, [cameraOn]);

  return (
    <>
      <Button
        fullWidth
        variant='outlined'
        sx={{ mt: 2 }}
        onClick={() => setCameraOn(true)}
      >
        Login with Facial Recognition
      </Button>

      {cameraOn && (
        <div
          id="container"
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            margin: 'auto',
          }}
        >
          <canvas
            id="overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: imageSent ? 'block' : 'none',
            }}
          ></canvas>
          <video
            id="video-feed"
            width="100%"
            height="100%"
            autoPlay
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: imageSent ? 'none' : 'block',
            }}
          ></video>
        </div>
      )}
    </>
  );
}
