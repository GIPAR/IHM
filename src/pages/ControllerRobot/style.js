import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #333;
  margin: 1rem;
  padding: 1rem;
`;

export const ZoneProxemic = styled.span`
  color: black;
  font-size: 0.9rem;

  b {
    color: red;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .items-inlined {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2rem;
  }

  @media (max-width: 1020px) {
    .items-inlined {
      flex-direction: column;
      width: 50%;
    }
  }
`;
