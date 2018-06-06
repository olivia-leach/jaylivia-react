import React from 'react';

export default class Map extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      directionsRequest: false,
      directionsType: 'DRIVING',
      onteora: { lat: 42.014140, lng: -74.257930 },
      rhinecliff: { lat: 41.921277, lng: -73.951379 },
      lodge: { lat: 42.034640, lng: -74.114870 },
      central: { lat: 42.041799, lng: -74.117484 },
      bw: { lat: 41.939784, lng: -74.029311 },
    };

    this.fitBounds = this.fitBounds.bind(this)
  }

  componentDidMount() {
    const styles = [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#46bcec"
              },
              {
                  "visibility": "on"
              }
          ]
      }
    ]

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: { lat: 42.0420, lng: -74.160139 },
      // center: this.state.central,
      styles,
      mapTypeControl: false,
      streetViewControl: false,
      gestureHandling: 'greedy',
    });

    this.addMarkerWithTimeout(this.state.onteora, 200, map, 'Onteora')
    this.addMarkerWithTimeout(this.state.bw, 200, map, 'Best Western')
    this.addMarkerWithTimeout(this.state.central, 200, map, 'Central Woodstock<br />Parking Lot')
    this.addMarkerWithTimeout(this.state.lodge, 200, map, 'The Lodge')
    this.setState({ map }, () => { window.setTimeout(this.fitBounds, 500) })
  }

  addMarkerWithTimeout(position, timeout, map, label) {
    window.setTimeout(function() {
      const marker = new google.maps.Marker({
        position,
        map,
        animation: google.maps.Animation.DROP
      })
      const infoWindow = new google.maps.InfoWindow({
        content: `<p class="info-window">${label}</p>`,
      });
      infoWindow.open(map, marker)
      marker.addListener('click', function() {
        infoWindow.open(map, marker)
      })
    }, timeout);
  }

  fitBounds() {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.state.onteora)
    bounds.extend(this.state.bw)
    bounds.extend(this.state.lodge)
    bounds.extend(this.state.central)
    this.state.map.fitBounds(bounds)
    this.state.map.setZoom(this.state.map.getZoom() - 1)
  }

  initDirections() {
    const reactRef = this;
    const input = document.getElementById('places-search');
    const searchBox = new google.maps.places.Autocomplete(input);
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    this.setState({
      searchBox,
      directionsDisplay,
      directionsService,
    });
    searchBox.addListener('place_changed', function() {
      reactRef.getDirections();
    })
  }

  getDirections() {
    const reactRef = this;
    const place = reactRef.state.searchBox.getPlace()
    const transit = reactRef.state.directionsType === 'TRANSIT'
    const directionsRequest = {
      origin: place.geometry.location,
      destination: !transit ? reactRef.state.onteora : reactRef.state.rhinecliff,
      provideRouteAlternatives: true,
      travelMode: reactRef.state.directionsType,
    }

    reactRef.state.directionsDisplay.setMap(reactRef.state.map);
    reactRef.state.directionsService.route(directionsRequest, function(result, status) {
      if (status === 'OK') {
        const details = result.routes[0].legs[0]
        reactRef.state.directionsDisplay.setDirections(result)
        reactRef.state.marker.setMap(reactRef.state.map);
        reactRef.state.marker.setLabel(transit ? null : 'B')
        reactRef.setState({
          directionsDetail: {
            duration: details.duration.text,
          },
          place: place.geometry.location,
        }, () => window.scrollTo(0, 0))
      }
    })
  }

  changeTransit(directionsType) {
    this.setState({
      directionsType
    }, () => {
      this.getDirections()
    })
  }

  render() {
    return (
      <div className='map-container'>
        {/*}<h1 className='script-header'>The Catskill Mountains</h1>*/}
        {this.state.directionsDetail &&
          <div className="directions">
            <div>{this.state.directionsDetail.duration}</div>
          </div>
        }
        <div id="map" className='map-canvas' />
        {/*}<div className='controls'>
          <input id='places-search' type='text' placeholder='Where ya coming from?' />
          <div className='radios'>
            <div>
              <input type='radio' id='car' checked={this.state.directionsType === 'DRIVING'} onChange={() => this.changeTransit('DRIVING')} />
              <label>Driving</label>
            </div>
            <div>
              <input type='radio' id='public' checked={this.state.directionsType === 'TRANSIT'} onChange={() => this.changeTransit('TRANSIT')} />
              <label>Train</label>
            </div>
          </div>
        </div>
        {/*this.state.directionsType === 'TRANSIT' && this.state.directionsDetail &&
          <p className='footnote'>We recommend taking Amtrak to the Rhinecliff–Kingston train station and then hopping in a taxi or Uber/Lyft/On-demand-car-service-of-your-choosing. Onteora is about a 30 minute drive from the station.</p>
        */}
      </div>
    );
  }
}
