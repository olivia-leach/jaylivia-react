import styled from 'styled-components';

const Button = styled.button`
  background-color: #5a7d9b;
  transition: 0.2s all ease-in;
  text-transform: uppercase;
  padding: 10px 0px;
  border-radius: 300px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
  font-family: inherit;
  font-size: 0.8rem;
  &:hover {
    background-color: rgba(54, 179, 168, 1);
    letter-spacing: 3px;
  }
  a {
    padding: 10px 20px;
  }
`;

export default Button;
