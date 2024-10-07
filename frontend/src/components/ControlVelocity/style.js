import styled from 'styled-components';

export const Subtitle = styled.h4`
  color: rgba(0, 0, 0, 0.6);
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  padding: 0;
  position: relative;
`;

export const Section = styled.div`
  height: 100%;

  h4 {
    margin: 0;
    margin-bottom: 1.8rem;
  }

  @media (max-width: 1020px) {
    width: 100%;
    margin: 1rem 0;
    padding: 0.5rem 0;
  }
`;
