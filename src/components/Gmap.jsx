import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class Gmap extends Component {
  state = {
    origin: '',
    destination: '',
    directionsService: new this.props.google.maps.DirectionsService(),
    directionsRenderer: new this.props.google.maps.DirectionsRenderer(),
    distanceMatrixSerice: new this.props.google.maps.DistanceMatrixService(),
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.positions.length === 2 && !this.state.destination) {
      let origin = {
        lat: this.props.positions[0].lat,
        lng: this.props.positions[0].lng,
      };
      let destination = {
        lat: this.props.positions[1].lat,
        lng: this.props.positions[1].lng,
      };
      this.setState({ origin, destination });
    }
    if (prevState.destination !== this.state.destination) {
      this.startDirection();
    }
  }

  setDirectionsToMap = (mapProps, map) => {
    this.state.directionsRenderer.setMap(map);
  };

  startDirection = () => {
    this.state.distanceMatrixSerice.getDistanceMatrix(
      {
        origins: [this.state.origin],
        destinations: [this.state.destination],
        travelMode: 'DRIVING',
      },
      (response) => {
        this.props.getDistance(response.rows[0].elements[0].distance.value);
      }
    );

    this.state.directionsService.route(
      {
        origin: this.state.origin,
        destination: this.state.destination,
        travelMode: this.props.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          console.log(response);
          this.state.directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  };

  render() {
    return (
      <Map
        containerStyle={{ width: '40%', height: '45vh' }}
        google={this.props.google}
        zoom={10}
        onReady={this.setDirectionsToMap}
        initialCenter={{
          lat: 41.3947688,
          lng: 2.078728,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(Gmap);
