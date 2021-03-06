import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    position: relative;
  }

  body {
    font-family: 'Raleway', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;s
  }

  p,
  label {
    line-height: 1.5em;
  }
`;
