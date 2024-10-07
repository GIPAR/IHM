import styled from 'styled-components';
import Grid from '@mui/material/Grid';

export const GridStyled = styled(Grid)`
  max-width: 1500px;
  margin: 4rem;
`;

export const ImageStyled = styled.img`
  display: auto;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: #333;
`;

export const Paragraph = styled.p`
  margin: 0rem 1rem;
  padding: 0.8rem;
  font-weight: bold;
  color: #202020;
  text-align: justify;
`;
