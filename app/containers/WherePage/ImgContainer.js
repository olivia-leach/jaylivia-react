import styled from 'styled-components';
import Hero from './mountains.jpg';

export default styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: url(${Hero});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  color: #fff;
`;