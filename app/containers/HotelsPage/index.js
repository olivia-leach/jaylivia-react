import React from 'react';
import Helmet from 'react-helmet';
import ImgContainer from './ImgContainer';
import Card from 'components/Card';

export default class HotelsPage extends React.PureComponent {
  componentDidMount() {
    window.sr = ScrollReveal();
    sr.reveal('.card', 50);
  }

  render() {
    return (
      <article>
        <Helmet
          title="Hotels"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <ImgContainer className='hotel-image'>
          <div className='content-wrapper hotels-page'>
            <Card
              name="Woodstock"
              textBody="We highly encourage our guests to stay in Woodstock during our wedding weekend. Off the beaten path, Woodstock is a funky town about 15 minutes from the venue, where you'll find many B&Bs, small hotels, and homes for rent. Shuttles will be provided from the center of town to the venue and back again. Our after party will be held at The Lodge at 20 Country Club Lane, which also has 15 rooms on site that are available to book."
              priceRange="$100 - $200"
              buttons={[
                { label: 'Search AirBnb', link: 'https://www.airbnb.com/s/Woodstock--NY--United-States/all?guests=2&checkin=2018-06-22&checkout=2018-06-24' },
                { label: 'The Lodge', link: 'http://thelodgewoodstock.com/' }
              ]}
              className="card big-card"
            />
            <div className="little-cards">
              <Card
                name="Best Western"
                location="Kingston, NY"
                textBody="We have secured a group rate at this hotel, which is right off the highway in Kingston, for our guests who prefer something quick and easy. Please call and mention the Leach-Clark wedding for the special rate: (845) 338-0400. Buses will pick up guests at this hotel."
                priceRange="$199"
                className="card little-card"
                buttons={[
                  { label: 'More Info', link: 'http://bwpkingston.com/' }
                ]}
              />
              <Card
                name="Camping"
                location="Kenneth L. Wilson Campground"
                textBody="For the more adventerous guest—This campground is 9 minutes from our venue and boasts of having panoramic views of the Catskill mountains and large, secluded campsites. Amenities include hot showers!"
                priceRange="$27"
                className="card little-card"
                buttons={[
                  { label: 'Book a Campsite', link: 'https://newyorkstateparks.reserveamerica.com/camping/kenneth%20l.%20wilson/r/campgroundDetails.do?contractCode=NY&parkId=117' }
                ]}
                dogFriendly
              />
              <Card
                name="Emerson Resort & Spa"
                location="Phoenicia, NY"
                textBody="Just 5 minutes from our venue, this resort may be the choice for our guests looking to treat themselves as it has a luxury spa on site. And it's dog friendly! Rosie approves."
                priceRange="$259"
                className="card little-card"
                buttons={[
                  { label: 'Book Now', link: 'http://www.thegrahamandco.com/' }
                ]}
              />
            </div>
          </div>
        </ImgContainer>
      </article>
    );
  }
}
