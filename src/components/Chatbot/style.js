import styled from 'styled-components';

export const DivStyled = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  @media (max-width: 620px) {
    right: 0.5rem;
    bottom: 3.5rem;
  }
`;

export const ChatbotIconStyled = styled.img`
  width: 5rem;
  max-width: 100%;
  cursor: pointer;
  transition: opacity display 0.9s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

export const ChatbotContainerStyled = styled.div`
  color: #fc0000b2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: opacity display 0.9s;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

  iframe {
    width: 20rem;
    height: 25rem;
    border: none;
  }

  @media (max-width: 620px) {
    iframe {
      width: 80%;
      height: 22rem;
    }
  }
`;

export const IconCheckStyled = styled.img`
  cursor: pointer;
  width: 2rem;
  margin-right: 1rem;
`;

export const IconCancelStyled = styled.img`
  cursor: pointer;
  width: 2rem;
  margin-left: 1rem;
`;

export const ContainerIconsStyled = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${({ controller }) => (controller ? ('space-between') : ('flex-end'))};

  @media (max-width: 620px) {
    width: 80%;
  }
`;
