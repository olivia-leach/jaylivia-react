import styled from 'styled-components';

const Button = styled.button`
  background-color: #36b3a8;
  transition: 0.2s all ease-in;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 300px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
  font-family: inherit;
  &:hover {
    background-color: rgba(54, 179, 168, 0.8);
  }
`;

export default Button;
