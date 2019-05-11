import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';

import messages from './messages';
import ImgContainer from './ImgContainer';
import VideoContainer from './VideoContainer';
import HotelsPage from '../HotelsPage';
import Timeline from '../Timeline';
import Travel from '../TravelPage'
import moment from 'moment/moment'
import Rosie from './rosiehead.png'

const Scroll = require('react-scroll');

const Link = Scroll.Link;
// const Element = Scroll.Element;

export default class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      videoLoading: false,
      videoLoaded: false,
      donePlaying: false,
    };
  }

  componentDidMount() {
    window.sr = ScrollReveal();
    sr.reveal('.hashtag', 250);
    sr.reveal('.card');
    sr.reveal('.form-group', 50);
    sr.reveal('.timeline-event');
    sr.reveal('.travel-block');
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
    const days = moment([2018, 5, 23, 17]).diff(moment(), 'days')
    const hours = moment([2018, 5, 23, 17]).diff(moment(), 'hours') - (days * 24)

    return (
      <article className='page-wrapper'>
        <Helmet
          title="Olivia & Jay"
          meta={[
            { name: 'description', content: 'Jay and Olivia are getting married! Welcome to our wedding website.' },
          ]}
        />
        <div className='rosie-container'>
          {/*{days} day{days > 1 ? 's' : ''},<br />{hours} hour{hours > 1 ? 's' : ''}<br />to go!*/}
          happy {-days}-day
          <br />
          anniversary!
          <img src={Rosie} />
        </div>
        <div id='home'>
          <ImgContainer className='img-container'>
            <img alt="Jay and Olivia" src="https://fontmeme.com/permalink/171122/dcbff10d52e2d4383e039db03dd53b61.png" />
            <div className='date-box'>
              <h2>June 23, 2018</h2><span className='bullet'>&#9679;</span><h2><span>Onteora Mountain House,</span><span>&nbsp;Boiceville, NY</span></h2>
            </div>
            <div className='hashtags'>
              <span className="hashtag"><FormattedMessage {...messages.hashtags.olivia} /></span>
              <span className="hashtag"><FormattedMessage {...messages.hashtags.jay} /></span>
            </div>
            <Link to="timeline" smooth offset={-80} duration={500}>
              <Button className='watch-video'>celebrate with us! <i className="far fa-hand-point-down" aria-hidden="true"></i></Button>
            </Link>
          </ImgContainer>
        </div>
        <Timeline />
        <div className="rosie" />
        <HotelsPage />
        <div className="rosie woods" />
        <Travel />
        <div className="rosie num2" />
        <VideoContainer id="video">
          <div className="video-container">
            <div className={`video-cover ${this.state.videoLoaded && !this.state.donePlaying ? 'hidden' : ''}`} onClick={() => this.handlePlay()}>
              <i className={`fa fa-${this.state.videoLoading ? 'spinner fa-pulse' : 'play'}`} aria-hidden="true" />
            </div>
            <iframe id="theVideo" width="560" height="315" src="https://www.youtube.com/embed/cUl_ecN2ETs?enablejsapi=1" frameBorder="0" allowFullScreen />
          </div>
        </VideoContainer>
      </article>
    );
  }
}
