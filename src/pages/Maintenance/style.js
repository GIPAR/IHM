import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #333;
  margin: 1rem;
  padding: 1rem;
`;

export const Wrapper = styled.section`
  max-width: 920px;
  border: 1px solid #333;
  background: #fff;
  margin: 0 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  .container-items {
    width: 100%;
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
  margin: 2rem;
`;
