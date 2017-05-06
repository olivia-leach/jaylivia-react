import styled from 'styled-components';

export default styled.div`
  color: #1E1B14;
  font-size: 3.2rem;
  font-weight: 400;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  position: absolute;
  top: 25%;
  a {
    position: relative;
    margin: 0;
    font-size: 3.2rem;
    font-weight: 400;
    text-decoration: none;
    color: #1E1B14;
    transition: .5s ease letter-spacing;
    letter-spacing: normal;
    top: 0;
    &:hover {
      letter-spacing: 1px;
    }
  }
  .small {
    font-size: 2.5rem;
  }
  @media only screen and (max-width : 320px) {
    font-size: 2rem;
  }
  @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
    font-size: 2.2rem;
  }
`;
