import styled from 'styled-components';
import VideoCover from './hero2.jpg';

export default styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 70vh;
  .video-container {
    width: 80%;
    height: 70%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .video-cover {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    background: url(${VideoCover});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.hidden {
      display: none;
    }
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .fa {
    font-size: 6rem;
    color: #fff;
  }
`;
