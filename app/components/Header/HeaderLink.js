import { Link } from 'react-router';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em;
  margin: 0.5em 1em;
  text-decoration: none;
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
    color: #000;
  }

  &.logo {
    font-size: 1.7rem;
    margin: 0;
    padding: 0;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: 'Slabo 27px';
  }
`;