import React from 'react';
import Helmet from 'react-helmet';
import Button from 'components/Button';

export default class HotelsPage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet
          title="Hotels"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <div className='content-wrapper hotels-page'>
          <div className='card big-card'>
            <div className='img kattskill'>
              <h3>Kattskill Mountain Club</h3>
              <h4>Hunter, NY</h4>
            </div>
            <p>
              We have reserved a block of rooms at this hotel, which is about 30 minutes from Onteora.
              Free shuttle transportation will be provided between the venue and this hotel.
              This is where our after party will be happening, for those who are so inclined.
            </p>
            <div className='deets'>
              <p>Price range: $100 - $200</p>
              <p>Rooms fit 1 - 6 people</p>
            </div>
            <div className='button-container'><Button className='action'>Book a room</Button></div>
          </div>
          <h4>Other Options</h4>
          <div className='little-cards'>
            <div className='card little-card'>
              <div className='img kattskill'>
                <h3>Woodstock</h3>
              </div>
              <p>
                Woodstock is a funky town about 20 minutes from the venue, where you'll find many B&Bs and homes for rent.
                Please note, if you stay in Woodstock you will have to arrange your own transportation to the venue (parking is available on site. Bonus: you'll get a ride in a golf cart up to the main event).
              </p>
              <div className='deets'>
                <p>Price range: $100 - $200</p>
              </div>
              <div className='button-container'><Button className='action'>Search Air BnB</Button></div>
            </div>
            <div className='card little-card'>
              <div className='img kattskill'>
                <h3>Other Option</h3>
                <h4>Hunter, NY</h4>
              </div>
              <p>
                Right down the road from Onteora, this funky hotel is for low-key guests who want to be close to the action, but not too close to the after party.
                This hotel will be a stop on our shuttle route, should any of our guests choose to stay there.
              </p>
              <div className='deets'>
                <p>Price range: $100 - $200</p>
              </div>
              <div className='button-container'><Button className='action'>Book a room</Button></div>
            </div>
            <div className='card little-card'>
              <div className='img kattskill'>
                <h3>Graham & Co.</h3>
                <h4>Hunter, NY</h4>
              </div>
              <p>
                Another nearby option, blah blah blah blah
              </p>
              <div className='deets'>
                <p>Price range: $100 - $200</p>
              </div>
              <div className='button-container'><Button className='action'>Book a room</Button></div>
            </div>
          </div>
          <p className='footnote'>
            Kingston, NY also has a variety of chain hotles, if you're looking for something quick and easy.
            You will have to arrange your own transportation to/from these hotels, which are about 20 minutes away from Onteora.
          </p>
        </div>
      </article>
    );
  }
}
