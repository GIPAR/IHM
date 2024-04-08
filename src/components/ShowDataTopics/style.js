import styled from 'styled-components';

export const Subtitle = styled.h5`
  font-size: 0.9em;
  font-weight: 700;
  color: #333;
  margin: 0.8rem;
  display: block;
`;

export const Section = styled.div`
  .title-connection {
    font-size: 0.9em;
    color: #333;
    margin: 0.8rem;
    display: block;
  }

  input {
    margin: 0 1rem;
    padding: 0.5rem;
    width: 20rem;
    height: 2.3rem;
    border: 1px solid #333;
    border-radius: 0.5rem;
  }

  p {
    font-size: 0.9em;
    font-weight: 700;
    color: #333;
    margin: 0.8rem;
    display: block;
  }

  p span {
    font-size: 0.9em;
    font-weight: 400;
    margin: 0.8rem;
    color: #9C27B0;
  }

  button {
    margin: 0 1rem;
    padding: 0.5rem;
    width: 12rem;
    height: 2.3rem;
    border: 1px solid #333;
    border-radius: 0.5rem;
    background: #55A060;
    color: #fff;
    font-weight: 700;
    font-size: 0.9em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background: #1B5E20;
    color: #fff;
  }

  select {
    margin: 0 1rem;
    padding: 0.5rem;
    width: 20rem;
    height: 2.3rem;
    border: 1px solid #333;
    border-radius: 0.5rem;
    font-size: 0.8rem;
  }

  textarea {
    margin: 0 1rem;
    padding: 0.5rem;
    width: 90%;
    height: 20rem;
    border: 1px solid #333;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-weight: 300;
    font-style: italic;
  }
`;
