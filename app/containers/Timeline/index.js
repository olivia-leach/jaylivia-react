import React from 'react';
import TimelineEvent from 'components/TimelineEvent'
import BasementBoys from './basementBoys.jpg'
import Onteora from './onteora.jpg'
import Lodge from './thelodge.jpg'
import Reception from './reception.jpg'

export default class RSVPPage extends React.PureComponent {
  render() {
    return (
      <article id='timeline' className='timeline'>
        <h1 className='section-header'>Wedding Weekend</h1>
        <p className='section-p'>Intently sniff hand sleep in the bathroom sink so kick up litter massacre a bird in the living room and then look like the cutest and most innocent animal on the planet sweet beast steal the warm chair right after you get up hack. Throwup on your pillow scratch at the door then walk away have a lot of grump in yourself because you can't forget to be grumpy</p>
        <div className='timeline-container'>
          <div className='timeline-line' />
          <TimelineEvent
            title='Welcome Drinks'
            date="Friday: 8pm"
            image={BasementBoys}
            desc='Join us for welcome drinks at the Station Bar & Curio on Tinker Street -- special guests Buddy Clark & The Basement Boys!'
          />
          <TimelineEvent
            title='Ceremony'
            date='Saturday: 5pm'
            image={Onteora}
            left
            desc='Onteora Mountain House'
          />
          <TimelineEvent
            title='Reception'
            date='Saturday: 7pm - 11pm'
            image={Reception}
            desc='Onteora Mountain House'
          />
          <TimelineEvent
            title='After Party'
            date='Saturday: 11pm - ?'
            image={Lodge}
            desc='Party on, party people.'
            left
          />
          <TimelineEvent
            title='Goodbye Brunch'
            date='Sunday: 9 - 11am'
            desc='Swing by Onteora one last time so that we may bid you adieu before we leave for our Honeymoon!'
          />
        </div>
      </article>
    );
  }
}
