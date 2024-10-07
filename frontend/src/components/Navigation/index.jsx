import React, { useEffect } from 'react';
import ROSLIB from 'roslib';
import { RobotInforContext } from '../../providers/robotInfor';
import ROS2D from '../../nav2d/ros2d';
import NAV2D from '../../nav2d/nav2d';

export default function Autonomous() {
    const { robotInfor } = React.useContext(RobotInforContext);
    const {
        robotUrl,
    } = robotInfor;

    useEffect(() => {
        const ros = new ROSLIB.Ros({
        url : robotUrl
        });

        const viewer = new ROS2D.Viewer({
        divID : 'nav',
        width : 400,
        height : 400,
        });

        const nav = new NAV2D.OccupancyGridClientNav({
        ros : ros,
        rootObject : viewer.scene,
        viewer : viewer,
        serverName : '/move_base',
        withOrientation: true
        });

    }, []);

    return (
        <div id="nav"></div>
    );
}

