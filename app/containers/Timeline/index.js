import React from 'react';
import TimelineEvent from 'components/TimelineEvent'
import BasementBoys from './basementBoysArrow.png'
import Onteora from './onteora.jpg'
import Lodge from './thelodge.jpg'
import Reception from './reception.jpg'
import Brunch from './onteoraDiningHall.jpg'

const Scroll = require('react-scroll');
const Link = Scroll.Link;

export default class RSVPPage extends React.PureComponent {
  render() {
    const welcomeParagraph =
      <span>
        <span>Let's party! We're looking forward to celebrating the start of married life and sharing the beautiful Catskills with you. We want to see you as much as we can, so we've planned a buncha gatherings to pack in the memories. Want to make a long weekend out of it? Check out more&nbsp;</span>
        <Link to='things' smooth offset={-80} duration={500}>
          Things To Do
        </Link>
        <span>&nbsp;and join us. We'll be in town starting Thursday!</span>
      </span>

    return (
      <article id="timeline" className="timeline">
        <h1 className="section-header">Wedding Weekend</h1>
        <p className="section-p">
          {welcomeParagraph}
        </p>
        <div className="timeline-container">
          <div className="timeline-line" />
          <TimelineEvent
            title="Welcome Drinks"
            date="Friday: 8pm"
            image={BasementBoys}
            desc="Station Bar & Curio, Woodstock"
            desc2="Join us for welcome drinks and sing along with special guests Buddy Clark & The Basement Boys!"
          />
          <TimelineEvent
            title="Ceremony"
            date="Saturday: 5pm"
            image={Onteora}
            left
            desc="Onteora Mountain House"
            desc2="The main event! Witness our committment and lend your support as we take the plunge and tie the knot."
          />
          <TimelineEvent
            title="Cocktail Hour & Reception"
            date="Saturday 6pm - 11pm"
            image={Reception}
            desc="Onteora Mountain House"
            desc2="Immediately following the ceremony, enjoy cocktail hour while exploring the grounds. Then it's time to boogie! Join us for good food, music and dance as we celebrate our marriage."
          />
          <TimelineEvent
            title="After Party"
            date="Saturday: 11pm - ?"
            image={Lodge}
            desc="The Lodge Woodstock"
            desc2="Keep the party going. Shuttles will take guests from Onteora to The Lodge."
            left
          />
          <TimelineEvent
            title="Goodbye Brunch"
            date="Sunday: 9 - 11am"
            image={Brunch}
            desc2="Swing by Onteora one last time so that we may say bye before leaving for our Honeymoon!"
            desc="Onteora Mountain House"
          />
        </div>
      </article>
    );
  }
}
