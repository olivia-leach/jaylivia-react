import { Link } from 'react-router';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em;
  margin: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-size: 16px;
  color: #fff;
  opacity: 0.8;
  transition: 0.2s ease-in-out opacity;

  &:hover {
    opacity: 1;
  }

  &:active {
    color: #FFF;
  }
`;
