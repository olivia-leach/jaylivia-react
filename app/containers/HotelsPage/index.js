import React from 'react';
import ImgContainer from './ImgContainer';
import Card from 'components/Card';

export default class HotelsPage extends React.PureComponent {
  render() {
    const woodstockDeets = (
      <div className='extra-deets'>
        <div>
        <p className='left'>Walking distance from town:</p>
        <ul>
          <li><a href="http://villagegreenbb.com/">Village Green B&B</a></li>
          <li><a href="https://www.twingableswoodstockny.com">Twin Gables B&B</a></li>
          <li><a href="http://www.woodstock-inn-ny.com">The Woodstock Inn on the Millstream</a></li>
          <li><a href="http://morninggloryinwoodstock.com">Morning Glory B&B</a></li>
          <li><a href="http://www.thewhitedoverockotel.com">White Dove Rock Hotel (funky option)</a></li>
          <li><a href="http://www.woodstockway.com/book-1-1-1/">Woodstock Way (has 4 rental cabins on site)</a></li>
          <li><a href="http://aspectsgallery.com/ASPECTS/about_us.html">Aspect Inn & Spa</a></li>
        </ul>
        </div>
        <div>
        <p className='left'>Close to Woodstock but will require driving into town:</p>
        <ul>
          <li><a href="http://woodstockcountryinn.com/">Woodstock Country Inn</a></li>
          <li><a href="http://www.treegapretreat.com/">Retreat at Tree Gap</a></li>
          <li><a href="https://thehoteldylan.com/">Hotel Dylan</a></li>
          <li><a href="https://www.enchantedmanorinn.com/">Enchanted Manor of Woodstock</a></li>
        </ul>
        </div>
      </div>
    )
    
    const accomParagraph = "We encourage our guests to stay in historic Woodstock, a funky town about 15 minutes from our wedding venue. There are many B&Bs, small hotels, and homes for rent. We've secured a block at The Lodge, which will also host the after party. Shuttle service will provide transport from to and from Woodstock locations."

    return (
      <article id="accommodations">
        <h1 className="section-header">Accommodations</h1>
        <p className="section-p">
          {accomParagraph}
        </p>
        <ImgContainer className="hotel-image">
          <div className="content-wrapper hotels-page">
            <div className='row'>
              <Card
                name="The Lodge"
                location="Woodstock, NY"
                textBody="We have secured all of the rooms at The Lodge for our guests. The Lodge at Woodstock is under new ownership as of 2016 and has been garnering praise for its fantastic food, live music, and hospitality ever since. The cottage-style buildings are being completely re-vamped and offer a cozy, classic Catskill-mountain escape while also being in the heart of the quirky hippie town of Woodstock. Please call (845) 679-2814 and mention our wedding to reserve a room. Shuttle service will be provided to and from the wedding."
                buttons={[
                  { label: 'Website', link: 'http://thelodgewoodstock.com/' },
                  { label: 'Cabins & Rates', link: '/theLodge.pdf' }
                ]}
                className="the-lodge card big-card"
                priceRange="$150 - $275"
              />
              <Card
                name="Woodstock, NY"
                buttons={[
                  { label: 'Search AirBnb', link: 'https://www.airbnb.com/s/Woodstock--NY--United-States/all?guests=2&checkin=2018-06-22&checkout=2018-06-24' },
                ]}
                className="woodstock card"
                extraDeets={woodstockDeets}
                textBody="We've compiled a list of inns and bed and breakfasts in and around Woodstock. Many guests are renting homes through Airbnb, VRBO, or Homeaway as well. Shuttle service will be provided from the center of town."
                bigCard
              />
            </div>
            <div className='row'>
              <Card
                name="Emerson Resort & Spa"
                location="Phoenicia, NY"
                textBody="Just 5 minutes from our venue, The Emerson offers 26 spacious rooms in its contemporary style Inn. Extra bonus: it has the World's Largest Kaleidoscope. And it's dog friendly! Rosie approves. Rooms at Emerson will be available to book beginning January 2018."
                priceRange="$259"
                className="emerson card little-card wide"
                buttons={[
                  { label: 'Book Now', link: 'https://emersonresort.com/' }
                ]}
              />
              <Card
                name="Camping"
                location="Kenneth L. Wilson Campground"
                textBody="For the more adventerous guest—This campground is 9 minutes from our venue and boasts of having panoramic views of the Catskill mountains and large, secluded campsites. Amenities include hot showers!"
                priceRange="$27"
                className="camping card little-card"
                buttons={[
                  { label: 'Book a Campsite', link: 'https://newyorkstateparks.reserveamerica.com/camping/kenneth%20l.%20wilson/r/campgroundDetails.do?contractCode=NY&parkId=117' }
                ]}
                dogFriendly
              />
              <Card
                name="Best Western"
                location="Kingston, NY"
                textBody="We have secured a group rate at this hotel, which is right off the highway in Kingston. Please call and mention the Leach-Clark wedding for the special rate: (845) 338-0400. Shuttle service provided to and from the wedding."
                priceRange="$199"
                className="bw card little-card"
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