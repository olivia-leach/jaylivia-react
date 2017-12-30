import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import Mountains from './onteora.png';
import Tubing from './tubing.jpg';
import Poets from './poets.jpg';
import Overlook from './overlook.jpg';
import Platte from './platte.jpg';
import Kaleidoscope from './kaleidoscope.jpg'
import Joshuas from './joshuas.png'
import Shindig from './shindig.jpg'
import Silvia from './silvia.png'
import Breadalone from './breadalone.jpg'
import Flea from './flea.png'
import Kingston from './kingston.png'
import Katterskill from './katterskill.png'
import Fawns from './fawns.png'

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
            <p>We are so excited to have all of our friends and family in one of our favorite parts of the country. Check out this page for some inspiration for activities while you are in the area.</p>
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
            <Card
              className="card only-image"
              img={Tubing}
            />
            <div className="right">
              <h3>Tube the Esopus River</h3>
              <p>Join us the morning of June 22nd to tube this river at the launching off point in Phoenicia, NY (a 20 minute drive from Woodstock). </p>
              <Button>
                <a href="http://www.towntinker.com/" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
          <div className="row left">
            <div>
              <h3>Kaaterskill Falls</h3>
              <p>This short, moderately difficult hike (2 miles out and back) has an amazing payoff--the waterfall is one of the tallest in the Eastern US. The trailhead is a 30 minute drive north of Woodstock.</p>
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
            <Card
              className="card only-image"
              img={Fawns}
            />
            <div className="right">
              <h3>Fawn&#39;s Leap</h3>
              <p>This popular swimming hole and waterfall is great for kids or thrill seekers alike. Follow the footsteps of a young Jay Clark and jump off the cliffs into the crystal-clear water below.</p>
              <Button>
                <a href="http://www.catskillmountaineer.com/WF-KC-FL.html" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
          <div className="row left">
            <div>
              <h3>Hike Overlook Mountain</h3>
              <p>This moderate-to-difficult 4.8 mile hike pays off for the views at the top. Check out the old hotel ruins on the way up, and be sure to climb the fire tower at the peak! Find the trailhead at 335 Meads Mountain Road in Woodstock (and check out the Buddhist temple located across the street if you have the time!).</p>
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
            <Card
              className="card only-image"
              img={Poets}
            />
            <div className="right">
              <h3>Poet&#39;s Walk</h3>
              <p>Pop over to Jay&#39;s hometown of Red Hook to bask in the beauty of this 120 acre park, which features two miles of trails through woods and rolling meadows with splendid views of the Hudson.</p>
              <Button>
                <a href="https://www.scenichudson.org/parks/poetswalk" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
          <div className="row left">
            <div>
              <h3>Platte Clove Preserve</h3>
              <p>Explore this beautiful nature preserve</p>
              <Button>
                <a href="http://catskillcenter.org/platte-clove-preserve/" target="_blank">More Info</a>
              </Button>
            </div>
            <Card
              className="card only-image"
              img={Platte}
            />
          </div>
          <div className="hl" />
          <div className="row" id="eats">
            <Card
              className="card only-image"
              img={Joshuas}
            />
            <div className="right">
              <h3>Joshua&#39;s Cafe</h3>
              <p>Mediterranean food with a great brunch.<br />51 Tinker Street in Woodstock</p>
              <Button>
                <a href="http://joshuaswoodstock.com/" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
          <div className="row left">
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
            <Card
              className="card only-image"
              img={Breadalone}
            />
            <div className="right">
              <h3>Bread Alone Bakery</h3>
              <p>Delicious bakery & coffee shop centrally located in Woodstock serving breakfast, lunch, and brunch.<br />22 Mill Hill Road in Woodstock</p>
              <Button>
                <a href="https://www.breadalone.com/woodstock" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
          <div className="row left">
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
          <div className="hl" />
          <div className="row" id="more">
            <Card
              className="card only-image"
              img={Flea}
            />
            <div className="right">
              <h3>Woodstock Flea Market</h3>
              <p>Meet some local artists and vendors by perusing this flea market on Saturday morning from 9am - 5:30pm. Located one block from the town center.</p>
              <Button>
                <a href="http://www.mowerssaturdayfleamarket.com/" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
          <div className="row left" id="more">
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
          <div className="row" id="more">
            <Card
              className="card only-image"
              img={Kaleidoscope}
            />
            <div className="right">
              <h3>World&#39;s Largest Kaleidoscope</h3>
              <p>Presented without comment. Delivers what it promises. ($5, or free if you&#39;re staying at the Emerson!)</p>
              <Button>
                <a href="https://emersonresort.com/worlds-largest-kaleidoscope/" target="_blank">More Info</a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
