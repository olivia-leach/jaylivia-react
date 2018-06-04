import React from 'react';
import { Link } from 'react-router'

const Scroll = require('react-scroll');
const ScrollLink = Scroll.Link;

export default class HotelsPage extends React.PureComponent {
  render() {
    return (
      <article id="travel">
        <h1 className="section-header">Travel & Transportation</h1>
        <div className="content-wrapper travel">

          <div className='travel-block'>
            <h1>Air Travel</h1>
            <p>
              The closest airports are Stewart Newburgh International and Albany Airport, both about an hour from Woodstock.
              Another great small option is the Westchester County Airport, which is less than 2 hours away.
              You can also fly into the three major airports in the New York City area: JFK, LaGuardia, or Newark.
              The wedding is about 2 1/2 hours from NYC and 3 1/2 hours from Boston via car.
            </p>
          </div>

          <div className='travel-block'>
            <h1>Getting Around</h1>
            <p>
              We recommend renting a car (or finding a friend who already has one) and enjoying the scenic drive from any of the airports along the Hudson River to the Catskills.
              There is <Link to='thingstodo'>so much to do</Link> in the region and having a car is the best way to explore.
              If you rent a car and will be driving yourself to your accommodations and/or the venue, we recommend loading up any directions you will need ahead of time.
              Service can be spotty!
            </p>
          </div>

          <div className='travel-block'>
            <h1>No car? Here are some other options:</h1>
            <ul>
              <li>
                <div className='flex'>
                  <h4>Trailway Bus</h4>
                </div>
                <h5>Port Authority Bus Terminal to Woodstock, NY</h5>
                <p>
                  This trip takes two hours and thirty minutes and costs $29.
                  The Woodstock station is very close to the venue and area lodging (still requires a taxi ride, however).
                  Taxi information is available below.
                  Tickets available at <a target='_blank' href="http://trailwaysny.com">trailwaysny.com</a>.
                </p>
              </li>
              <li>
                <h4>Amtrak</h4>
                <h5>Penn Station to Rhinecliff, NY</h5>
                <p>
                  This trip takes 1 hour and 45 minutes and costs $28, but it&#39;s another 40 minutes by taxi from the Rhinecliff station to the wedding venue and area lodging.
                  Tickets available at <a target='_blank' href="http://amtrak.com">amtrak.com</a>.
                </p>
              </li>
            </ul>
          </div>

          <div className='travel-block'>
            <h1>Taxis and Local Transport</h1>
            <p>
              If you want to explore the area without your own car, one of the taxi companies below can take you around.
              These companies are small with limited fleets, however, so be sure to call ahead the day before to reserve the ride(s) you need.
              In very exciting news, <span className='bold'>Lyft</span> and <span className='bold'>Uber</span> are now options in the Hudson Valley!
              Just be prepared to wait a bit longer than you normally do in a big city.
            </p>
            <br />
            <ul>
              <li>
                <h4>Woodstock Town Car</h4>
                <a target='_blank' href='http://woodstocktowncar.com'>woodstocktowncar.com</a>
                <p>(845) 679-6656</p>
              </li>
              <li>
                <h4>Kingston Kab</h4>
                <a tareget='_blank' href='http://kingstonkabs.com'>kingstonkabs.com</a>
                <p>(845) 331-TAXI</p>
              </li>
            </ul>
          </div>

          <div className='travel-block'>
            <h1>Wedding Transportation</h1>
            <p>
              We are providing bus transportation to the wedding from the following locations: Kingston Best Western, The Lodge, and <a target='_blank' href='https://goo.gl/maps/hpymfA4abhy' className='rsvp-link'>downtown Woodstock</a>.
              School buses will be leaving these locations at 4:15pm and will return to the same locations after the reception.
              If you are staying elsewhere you will need to arrange your own transportation to the venue.
              Parking is available on site, but it is somewhat limited, so we encourage carpooling!
            </p>
          </div>

        </div>
      </article>
    );
  }
}
