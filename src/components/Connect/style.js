import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  @media (max-width: 620px) {
    flex-direction: column;
    button {
      margin: 1rem 0;
      width: 12rem;
    }
  }
`;

export default Container;
