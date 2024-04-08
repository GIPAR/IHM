import React from 'react';
import imgZoneOff from '../../assets/images/icon-wheelchair_Zona-Off.png';
import imgZonePersonal from '../../assets/images/icon-wheelchair_Zona-pessoal.png';
import imgZoneSocial from '../../assets/images/icon-wheelchair_Zona-social.png';
import imgZonePublic from '../../assets/images/icon-wheelchair_Zona-publica.png';
import { RobotInforContext } from '../../providers/robotInfor';
import Container from './style';

export default function ProxemicZone() {
  const { robotInfor } = React.useContext(RobotInforContext);
  const { proxemicZone } = robotInfor;

  const showImageProxemicZone = () => {
    switch (proxemicZone) {
      case 'personal':
        return imgZonePersonal;
      case 'social':
        return imgZoneSocial;
      case 'public':
        return imgZonePublic;
      default:
        return imgZoneOff;
    }
  };

  const showNameProxemicZone = () => {
    switch (proxemicZone) {
      case 'personal':
        return 'Pessoal';
      case 'social':
        return 'Social';
      case 'public':
        return 'Pública';
      default:
        return 'Desconhecida';
    }
  };

  return (
    <Container>
      <img src={showImageProxemicZone()} alt="Imagem da Cadeira de Rodas com zona proxemica" />
      <h4>Zona proxémica: </h4>
      <span>{showNameProxemicZone()}</span>
    </Container>
  );
}
