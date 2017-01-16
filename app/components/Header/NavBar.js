import styled from 'styled-components';

export default styled.div`
  text-align: right;
  background-color: 'transparent';
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2000;
  padding: 30px 100px;
  transition: .2s all ease-in-out;
  .logo {
    position: absolute;
    left: 40px;
    height: 100px;
    transition: .2s height ease-in-out;
  }
  a {
    font-size: 0.9rem;
    font-weight: bold;
    &.active {
      border-bottom: 3px solid #36b3a8;
    }
  }
  &.fixed {
    background-color: #1E1B14;
    padding: 10px 100px;
    .logo {
      height: 65px;
      top: 5px;
      left: 30px;
    }
  }
`;
