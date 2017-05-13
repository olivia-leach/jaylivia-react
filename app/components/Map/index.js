import React from 'react';

export default class Map extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      directionsRequest: false,
    };
  }

  componentDidMount() {
    const onteora = { lat: 42.014140, lng: -74.257930 }
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
    const infowindow = new google.maps.InfoWindow({
      content: '<p class="info-window"><a href="http://www.onteora.com/">Onteora Mountain House</a><br />Boiceville, NY</p>',
      // open: true,
    });
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: onteora,
      styles,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const marker = new google.maps.Marker({
      position: onteora,
      map,
    });
    infowindow.open(map, marker)
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    this.setState({
      map
    })
  }

  getDirections() {
    this.setState({
      directionsRequest: true,
    }, () => {
      var input = document.getElementById('places-search');
      var searchBox = new google.maps.places.SearchBox(input);
      // this.state.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    })
  }

  render() {
    return (
      <div className='map-container'>
        <div className='controls'>
          <input id='places-search' type='text' placeholder='Where ya coming from?' className={this.state.directionsRequest ? '' : 'hidden'} />
          {!this.state.directionsRequest && <button onClick={this.getDirections.bind(this)}>Get Directions</button>}
          </div>
        <div id="map" className='map-canvas' />
      </div>
    );
  }
}
