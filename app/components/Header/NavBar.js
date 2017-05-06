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
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 0.9rem;
    font-weight: bold;
    &.active {
      border-bottom: 3px solid #36b3a8;
    }
    &.black {
      color: #1E1B14;
    }
  }
  &.fixed {
    background-color: #1E1B14;
    padding: 10px 100px;
    a {
      color: #fff;
    }
  }
`;
