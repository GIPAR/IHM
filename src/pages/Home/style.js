import styled from 'styled-components';
import Grid from '@mui/material/Grid';

export const GridStyled = styled(Grid)`
  max-width: 1080px;
  margin: 0 auto;
`;

export const ImageStyled = styled.img`
  display: block;
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #333;
  margin: 1rem;
  padding: 1rem;
`;

export const Paragraph = styled.p`
  margin: 0rem 1rem;
  padding: 0 1rem;
  padding-bottom: 1rem;
  color: #202020;
  text-align: justify;
`;
