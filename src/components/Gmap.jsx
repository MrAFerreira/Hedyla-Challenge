import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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
    /* const { google } = mapProps;
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer(); */
    this.state.distanceMatrixSerice.getDistanceMatrix(
      {
        origins: [this.state.origin],
        destinations: [this.state.destination],
        travelMode: 'DRIVING',
      },
      (response) => {
        this.props.getDistance(response.rows[0].elements[0].distance.value);
        /*  console.log(response.rows[0].elements[0].distance.value); */
      }
    );

    this.state.directionsService.route(
      {
        origin: this.state.origin,
        destination: this.state.destination,
        /*   waypoints: waypts, */
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
        style={{ width: '100%', height: '45vh' }}
        google={this.props.google}
        zoom={14}
        onReady={this.setDirectionsToMap}
      ></Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFVCHnHM4zzb3RV3nkZW260svhJYKsaXI',
})(Gmap);
