import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';

import messages from './messages';
import ImgContainer from './ImgContainer';
import VideoContainer from './VideoContainer';

const Scroll = require('react-scroll');

const Link = Scroll.Link;
const Element = Scroll.Element;

export default class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      videoLoading: false,
      videoLoaded: false,
      donePlaying: false,
    };
  }

  handlePlay() {
    const reactRef = this;
    this.setState({
      videoLoading: true
    }, function() {
      const player = new YT.Player('theVideo', {
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        }
      });

      function onPlayerReady() {
        player.playVideo();
        reactRef.setState({
          videoLoaded: true,
        });
      }

      function onPlayerStateChange(event) {
        if (event.data === 1) {
          reactRef.setState({
            videoLoaded: true,
            videoLoading: false,
          });
        }
        if (event.data === 0) {
          player.stopVideo();
          reactRef.setState({
            donePlaying: true,
          });
        }
      }
    });
  }

  render() {
    return (
      <article>
        <Helmet
          title="Hello!"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <ImgContainer className='img-container'>
          <div className='hashtags'>
            <FormattedMessage {...messages.hashtags.olivia} />
            <FormattedMessage {...messages.hashtags.jay} />
            <Link to="video" spy smooth offset={-5} duration={500}>
              <Button className='watch-video'>watch the video  &lt;3</Button>
            </Link>
          </div>
        </ImgContainer>
        <Element name="video">
          <VideoContainer>
            <div className="video-container">
              <div className={`video-cover ${this.state.videoLoaded && !this.state.donePlaying ? 'hidden' : ''}`} onClick={() => this.handlePlay()}>
                <i className={`fa fa-${this.state.videoLoading ? 'spinner fa-pulse' : 'play'}`} aria-hidden="true" />
              </div>
              <iframe id="theVideo" width="560" height="315" src="https://www.youtube.com/embed/cUl_ecN2ETs?enablejsapi=1" frameBorder="0" allowFullScreen />
            </div>
          </VideoContainer>
        </Element>
      </article>
    );
  }
}