import React from 'react';
import airplane from './airplane.png'
import car from './car.png'
import train from './train.png'
import bus from './bus.png'

export default class HotelsPage extends React.PureComponent {
  render() {
    return (
      <article id="travel">
        <h1 className="section-header">Travel & Transportation</h1>
        <div className="content-wrapper travel">
          <img src={airplane} className="travel-img airplane" />
          <h1>Getting There</h1>
          <p>If you plan to fly in for the wedding, you have many airport options. The closest small airports are Stewart Newburgh International (SWF) and Albany Airport. You can also fly into the three major airports in the New York City area: JFK, LaGuardia, or Newark. The wedding is about 2 and a half hours from NYC.</p>

          <img src={car} className="travel-img car" />
          <h1>Getting Around</h1>
          <p>Our first recommendation is to rent a car and enjoy the scenic drive from any of the airports along the Hudson River to the Catskills. It's glorious. Plus, there's so much to do in the region, and having a car is the best way to explore. If you rent a car and will be driving yourself to your accommodations and/or the venue, we recommend printing out all directions you will need from Google Maps ahead of time. Service can be spotty!</p>

          <img src={train} className="travel-img train" />
          <img src={bus} className="travel-img bus" />
          <h1>That being said, it is possible to arrive without a car! Here&#39;s how:</h1>
          <ul>
            <li>
              <h3>Trailway Bus</h3>
              <h5>Port Authority Bus Terminal to Woodstock, NY</h5>
              <p>This trip takes two hours and thirty minutes and costs $29. The Woodstock station is very close to the venue and area lodging (still requires a taxi ride, however). Taxi information is available below. Tickets available at <a href="http://trailwaysny.com">trailwaysny.com</a>.</p>
            </li>
            <li>
              <h3>Amtrak</h3>
              <h5>Penn Station to Rhinecliff, NY</h5>
              <p>This trip takes 1 hour and 45 minutes and costs $28, but it&#39;s another 40 minutes by taxi from the Rhinecliff station to the wedding venue and area lodging. Tickets available at <a href="http://amtrak.com">amtrak.com</a>.</p>
            </li>
          </ul>

          <h1>Taxis and Local Transport</h1>
          <p>If you want to explore the area without your own car, one of the taxi companies below can take you around. These companies are small with limited fleets, however, so be sure to call ahead the day before to reserve the ride(s) you need. In very exciting news, Lyft and Uber are now options in the Hudson Valley! Just be prepared to wait a bit longer than you normally do in a big city.</p>
          <ul>
            <li>
              <h3>Woodstock Town Car</h3>
              <a href='http://woodstocktowncar.com'>woodstocktowncar.com</a>
              <p>(845) 679-6656</p>
            </li>
            <li>
              <h3>Kingston Kab</h3>
              <a href='http://kingstonkabs.com'>kingstonkabs.com</a>
              <p>(845) 331-TAXI</p>
            </li>
          </ul>

        </div>
      </article>
    );
  }
}
