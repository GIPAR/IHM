import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import iconChatbot from '../../assets/images/chatbot.png';
import iconCheck from '../../assets/images/check.png';
import iconCancel from '../../assets/images/delete.png';
import {
  ChatbotContainerStyled,
  ChatbotIconStyled,
  ContainerIconsStyled,
  DivStyled, IconCancelStyled,
  IconCheckStyled,
} from './style';

const closeIconStyled = {
  fontSize: '2.5rem',
  cursor: 'pointer',
};

export default function Chatbot({ link, isController }) {
  const [showChatbot, setShowChatbot] = useState(false);

  const handlerShowChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <DivStyled>
      <ChatbotIconStyled
        onClick={handlerShowChatbot}
        src={iconChatbot}
        alt="Chatbot"
        fontSize="large"
        isVisible={!showChatbot}
      />
      <ChatbotContainerStyled isVisible={showChatbot}>
        <ContainerIconsStyled controller={isController}>
          {isController && (
          <div>
            <IconCheckStyled src={iconCheck} alt="Check" />
            <IconCancelStyled src={iconCancel} alt="Cancel" />
          </div>
          )}
          <CloseIcon
            onClick={handlerShowChatbot}
            style={closeIconStyled}
          />
        </ContainerIconsStyled>
        <iframe
          title="Chatbot"
          allow="microphone;"
          width="350"
          height="430"
        />
      </ChatbotContainerStyled>
    </DivStyled>
  );
}

Chatbot.defaultProps = {
  isController: undefined,
};

Chatbot.propTypes = {
  link: PropTypes.string.isRequired,
  isController: PropTypes.bool,
};
