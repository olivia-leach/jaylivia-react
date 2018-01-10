import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import Mountains from './onteora.png';
import Tubing from './tubing.jpg';
import Poets from './poets.jpg';
import Overlook from './overlook.jpg';
import Platte from './platte.jpg';
import Kaleidoscope from './kaleidoscope.jpg'
import Joshuas from './joshuas.jpg'
import Shindig from './shindig.jpg'
import Silvia from './silvia.jpg'
import Breadalone from './breadalone.jpg'
import Flea from './flea.png'
import Kingston from './kingston.jpg'
import Katterskill from './katterskill.jpg'
import Fawns from './fawns.jpg'
import Zipline from './zipline.jpg'
import Ashokan from './ashokan.jpg'

const Scroll = require('react-scroll');

const Link = Scroll.Link;

export default class ThingsToDo extends React.PureComponent {
  componentDidMount() {
    window.sr = ScrollReveal();
    sr.reveal('.row');
  }

  render() {
    return (
      <article id="things" className="things">
        <div className='mountains'>
          <img src={Mountains} />
          <div className="hero">
            <h1>Welcome to the Catskills!</h1>
            <p>We&#39;re super excited to have all our friends and family in one place. We think you&#39;ll love it here! The Catskills & Hudson River valley host some amazing experiences, ready for you to explore.</p>
          </div>
        </div>
        <div className="row links">
          <Link
            to="outdoors"
            smooth
            offset={-150}
            duration={500}
          >
            The Great Outdoors
          </Link>
          <Link
            to="eats"
            smooth
            offset={-150}
            duration={500}
          >
            Eats and Drinks
          </Link>
          <Link
            to="more"
            smooth
            offset={-150}
            duration={500}
          >
            And More!
          </Link>
        </div>
        <div className="content">
          <div className="row" id="outdoors">
            <div>
              <h3>Kaaterskill Falls</h3>
              <p>A short, moderate hike with an amazing payoff. The waterfall is one of the tallest in the Eastern US. 2 miles out and back. The <a href="https://goo.gl/maps/Z87PLsy4uQx" target="_blank" className="dark-link">trailhead</a> is a 30 minute drive north of Woodstock.</p>
              <Button>
                <a target="_blank" href="http://hikethehudsonvalley.com/kaaterskill-falls/">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Katterskill}
            />
          </div>
          <div className="row">
            <div>
              <h3>Overlook Mountain</h3>
              <p>This moderate-to-difficult 4.8 mile hike has amazing views at the top. Check out the old hotel ruins on the way up, and be sure to climb the fire tower at the peak! Find the trailhead at <a href="https://goo.gl/maps/Ufuky2CXbL62" className="dark-link" target="_blank">335 Meads Mountain Road</a> in Woodstock (and check out the <a href="https://www.tripadvisor.com/Attraction_Review-g48915-d116288-Reviews-Karma_Triyana_Dharmachakra_Tibetan_Buddhist_Monastery-Woodstock_Catskill_Region_New.html" target="_blank" className="dark-link">Buddhist temple</a> across the street if you have time!).</p>
              <Button>
                <a target="_blank" href="https://www.alltrails.com/trail/us/new-york/overlook-mountain-trail">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Overlook}
            />
          </div>
          <div className="row">
            <div>
              <h3>Platte Clove Preserve</h3>
              <p>A nature preserve 20 minutes north of Woodstock with 208 acres of trails and waterfalls.</p>
              <Button>
                <a href="http://catskillcenter.org/platte-clove-preserve/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Platte}
            />
          </div>
          <div className="row">
            <div>
              <h3>Poet&#39;s Walk</h3>
              <p>A staple of Red Hook (Jay&#39;s Hometown) - A 120 acre park with a relaxing, rejuvinating two mile loop through woods and rolling meadows with splendid views of the Hudson. 20 minutes from Woodstock.</p>
              <Button>
                <a href="https://www.scenichudson.org/parks/poetswalk" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Poets}
            />
          </div>
          <div className="row">
            <div>
              <h3>Tube the Esopus River</h3>
              <p>Join us the morning of June 22nd to tube this river at the launching off point in Phoenicia, NY. 20 minutes from Woodstock.</p>
              <Button>
                <a href="http://www.towntinker.com/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Tubing}
            />
          </div>
          <div className="row">
            <div>
              <h3>Fawn&#39;s Leap</h3>
              <p>A thrilling 30-foot cliff jump into a natural swimming hole. A great opportunity to "take the leap" yourself before the wedding. (Jay wrote that)</p>
              <Button>
                <a href="http://www.catskillmountaineer.com/WF-KC-FL.html" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Fawns}
            />
          </div>
          <div className="row">
            <div>
              <h3>New York Zip Line</h3>
              <p>40 minutes away in Hunter, NY is the largest zipline canopy tour in North America.</p>
              <Button>
                <a href="https://www.ziplinenewyork.com/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Zipline}
            />
          </div>
          <div className="row">
            <div>
              <h3>Ashokan Rservoir</h3>
              <p>An easy, flat trail (5.4 miles out-and-back) with beautiful views of the reservoir and surrounding mountains. Park at the <a target="_blank" href="https://goo.gl/maps/yykNAPQ91YQ2" className="dark-link">East Parking Lot</a>, which is 20 minutes from Woodstock.</p>
              <Button>
                <a href="https://www.alltrails.com/trail/us/new-york/esopus-creek-and-ashokan-reservoir" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Ashokan}
            />
          </div>
          <span className="hl" />
          <div className="row" id="eats">
            <div>
              <h3>Joshua&#39;s Cafe</h3>
              <p>Mediterranean food with a great brunch.<br />51 Tinker Street in Woodstock</p>
              <Button>
                <a href="http://joshuaswoodstock.com/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Joshuas}
            />
          </div>
          <div className="row">
            <div>
              <h3>Shindig</h3>
              <p>In the heart of Woodstock, Shindig is a cute breakfast and lunch place with a nice selection of burgers.<br />1 Tinker Street in Woodstock</p>
              <Button>
                <a href="http://www.woodstockshindig.com/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Shindig}
            />
          </div>
          <div className="row">
            <div>
              <h3>Bread Alone Bakery</h3>
              <p>Delicious bakery & coffee shop centrally located in Woodstock serving breakfast, lunch, and brunch.<br />22 Mill Hill Road in Woodstock</p>
              <Button>
                <a href="https://www.breadalone.com/woodstock" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Breadalone}
            />
          </div>
          <div className="row">
            <div>
              <h3>Silvia</h3>
              <p>This fancier-than-average Woodstock restaurant features locally-sourced, organic food. Check out the great cocktails and fun outdoor patio!<br />42 Mill Hill Road in Woodstock</p>
              <Button>
                <a href="https://www.silviawoodstockny.com/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Silvia}
            />
          </div>
          <span className="hl" />
          <div className="row" id="more">
            <div>
              <h3>Woodstock Flea Market</h3>
              <p>Every Saturday from 9-5. Meet some local makers, artists and vendors and peruse the market.</p>
              <Button>
                <a href="http://www.mowerssaturdayfleamarket.com/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Flea}
            />
          </div>
          <div className="row">
            <div>
              <h3>Historic Kingston Waterfront</h3>
              <p>There are all kinds of neat things to explore by the Kingston waterfront: Shopping, antiquing, wine bars, bakeries, kayak rentals, sailing, museums, a lighthouse, etc. Drive on Broadway towards the Hudson River/Rondout Creek, park near the water and explore!</p>
              <Button>
                <a href="http://thekingstonwaterfront.com/discover-downtown/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Kingston}
            />
          </div>
          <div className="row">
            <div>
              <h3>World&#39;s Largest Kaleidoscope</h3>
              <p>Presented without comment. Delivers what it promises. ($5, or free if you&#39;re staying at the Emerson!)</p>
              <Button>
                <a href="https://emersonresort.com/worlds-largest-kaleidoscope/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Kaleidoscope}
            />
          </div>
        </div>
      </article>
    );
  }
}
