import ROSLIB from 'roslib';

const connected = false;
let ros; // this will be the connection to Ros
const topicName = '/cmd_vel'; // topic name for the UR robots
const linearRepeat = 1;
const angularRepeat = 1; // number of times to repeat command
const repeatInterval = 500; // wait time between repeats, in ms
let stopMotion = true;

/**
 * @returns Makes the connection between the application and the ROS
 */
export function connect(robotUrl) {
  ros = new ROSLIB.Ros({ // Connecting to ROS.
    url: robotUrl,
  });

  ros.on('connection', () => {
    console.log('Connected to websocket server: ', robotUrl);
  });
}

export function closeConnection() {
  console.log('Closing connection');
  ros.close();
}

function sendTwistMessage(xMove, zMove, speedFactor) {
  const cmdVel = new ROSLIB.Topic({
    ros,
    name: topicName,
    messageType: 'geometry_msgs/Twist',
  });

  const twist = new ROSLIB.Message({
    linear: {
      x: xMove * speedFactor,
      y: 0.0,
      z: 0.0,
    },
    angular: {
      x: 0.0,
      y: 0.0,
      z: zMove * speedFactor,
    },
  });

  // eslint-disable-next-line max-len, no-nested-ternary
  let reps = Math.max(1, Math.abs(twist.linear.x) > 0 ? linearRepeat : (Math.abs(twist.angular.z) > 0 ? angularRepeat : 1));

  function publishCmd() {
    if (!stopMotion) {
      cmdVel.publish(twist);
      if (reps > 1) {
        setTimeout(publishCmd, repeatInterval);
        reps -= 1;
      }
    }
  }

  if (typeof cmdVel.ros !== 'undefined') { // this would be if we are not connected
    stopMotion = false;
    publishCmd();
  }
}

/**
 *
 * @param {*} distance
 * @param {*} angle
 */
function moveRobotFromPose(distance, angle) {
  let statusString;
  if (connected) {
    let prevStatus = '';
    const moveClient = new ROSLIB.ActionClient({
      ros,
      serverName: 'move_base',
      actionName: 'move_base_msgs/MoveBaseAction',
    });
    // eslint-disable-next-line no-inner-declarations
    function yawToQuaternion(yaw) {
      return {
        x: 0,
        y: 0,
        z: Math.sin(yaw / 2),
        w: Math.cos(yaw / 2),
      };
    }
    const goal = new ROSLIB.Goal({
      actionClient: moveClient,
      goalMessage: {
        target_pose: {
          header: {
            frame_id: '/base_link', // '/base_footprint', doesn't seem to work on Loki, tho it does on Stage
          },
          pose: {
            position: {
              x: distance,
              y: 0,
              z: 0,
            },
            orientation: yawToQuaternion(angle),
          },
        },
      },
    });

    goal.on('status', (status) => {
      statusString = `Move robot status: ${JSON.stringify(status)}`;
      if (statusString !== prevStatus) {
        prevStatus = statusString;
      }
    });
    goal.send();
  }
}

export function arrowUp(linearSpeed, speedFactor) {
  sendTwistMessage(linearSpeed, 0.0, speedFactor);
}

export function arrowDown(linearSpeed, speedFactor) {
  sendTwistMessage(-linearSpeed, 0.0, speedFactor);
}

export function arrowRight(angularSpeed, speedFactor) {
  moveRobotFromPose(0, -angularSpeed);
  sendTwistMessage(0, 0.09, speedFactor);
}

export function arrowLeft(angularSpeed, speedFactor) {
  moveRobotFromPose(0, angularSpeed);
  sendTwistMessage(0, -0.09, speedFactor); // linearSpeed, angle
}
