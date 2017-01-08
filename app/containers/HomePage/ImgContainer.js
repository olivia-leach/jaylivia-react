import styled from 'styled-components';
import Hero from './hero.jpg';

export default styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, rgba(209, 207, 17, 0.05), rgba(0, 0, 0, 0.4), rgba(3, 5, 23, 0.8)), url(${Hero});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  color: #fff;
  margin-top: -2rem;
  a {
    position: absolute;
    top: 3rem;
    font-size: 1rem;
    margin-top: 2rem;
  }
`;
