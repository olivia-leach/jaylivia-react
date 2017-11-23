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
    const woodstockDeets = (
      <div>
        <p className='left'>The following inns and bed & breakfasts are walking distance from downtown Woodstock:</p>
        <ul>
          <li><a href="http://villagegreenbb.com/">Village Green B&B</a></li>
          <li><a href="https://www.twingableswoodstockny.com">Twin Gables B&B</a></li>
          <li><a href="http://www.woodstock-inn-ny.com">The Woodstock Inn on the Millstream</a></li>
          <li><a href="http://morninggloryinwoodstock.com">Morning Glory B&B</a></li>
          <li><a href="http://www.thewhitedoverockotel.com">White Dove Rock Hotel (funky option)</a></li>
          <li><a href="http://www.woodstockway.com/book-1-1-1/">Woodstock Way (has 4 rental cabins on site)</a></li>
          <li><a href="http://aspectsgallery.com/ASPECTS/about_us.html">Aspect Inn & Spa</a></li>
        </ul>
        <p className='left'>Close to Woodstock but will require driving into town:</p>
        <ul>
          <li><a href="http://thelodgewoodstock.com/">The Lodge</a></li>
          <li><a href="http://woodstockcountryinn.com/">Woodstock Country Inn</a></li>
          <li><a href="http://www.treegapretreat.com/">Retreat at Tree Gap</a></li>
          <li><a href="https://thehoteldylan.com/">Hotel Dylan</a></li>
          <li><a href="https://www.enchantedmanorinn.com/">Enchanted Manor of Woodstock</a></li>
        </ul>
      </div>
    )

    return (
      <article>
        <Helmet
          title="Accommodations"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <ImgContainer className='hotel-image'>
          <div className='content-wrapper hotels-page'>
            <div className='col'>
              <Card
                name="Woodstock, NY"
                textBody="We highly encourage our guests to stay in historic Woodstock during our wedding weekend. Woodstock is a funky town about 15 minutes from the venue, where you'll find many B&Bs, small hotels, and homes for rent. Shuttles will be provided from the center of town to the venue and back again."
                buttons={[
                  { label: 'Search AirBnb', link: 'https://www.airbnb.com/s/Woodstock--NY--United-States/all?guests=2&checkin=2018-06-22&checkout=2018-06-24' },
                  { label: 'Search VRBO', link: 'https://www.vrbo.com/results?pets=false&q=Woodstock%2C+NY%2C+USA&infants=0&to-date=06%2F24%2F2018&children=0&from-date=06%2F22%2F2018&adults=2&uuid=' }
                ]}
                className="card big-card"
                extraDeets={woodstockDeets}
              />
            </div>
            <div className="col little-cards">
              <Card
                name="Emerson Resort & Spa"
                location="Phoenicia, NY"
                textBody="Just 5 minutes from our venue, this resort may be the choice for our guests looking to treat themselves as it has a luxury spa on site. And it's dog friendly! Rosie approves."
                priceRange="$259"
                className="card little-card"
                buttons={[
                  { label: 'Book Now', link: 'https://emersonresort.com/' }
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
                name="Kate's Lazy Meadow"
                location="Mt Tremper, NY"
                textBody="Owned by Kate Pierson of The B-52s fame, the 8-unit “mod motel” boasts a funky getaway experience. It features rustic-style suites with vintage furniture, private baths, 50s-style kitchens and an abundance of color. Small dogs are welcome."
                priceRange="$310"
                className="card little-card"
                buttons={[
                  { label: 'Book Now', link: 'https://www.lazymeadow.com/index.php?page=cabins' }
                ]}
                dogFriendly
              />
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
            </div>
          </div>
        </ImgContainer>
      </article>
    );
  }
}
