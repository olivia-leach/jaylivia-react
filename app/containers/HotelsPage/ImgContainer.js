import styled from 'styled-components';
import Hero from './hotel.jpg';

export default styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${Hero});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;
