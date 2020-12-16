import './App.css';
import React, { Component } from 'react';

import Gmap from './components/Gmap';
import Searchbox from './components/Searchbox';

let vehicles = {
  none: 0,
  truck: 0.5,
  van: 0.25,
  car: 0.1,
  motorbike: 0.05,
};

class App extends Component {
  state = {
    vehicle: '',
    distance: 0,
    fee: 0,
    total: 0,
    positions: [],
  };

  addPosition = (position) => {
    if (this.state.positions.length < 2) {
      this.setState({
        positions: [...this.state.positions, position],
      });
    } else {
      this.setState({
        positions: [],
      });
    }
  };

  getDistance = (distance) => {
    this.setState({ distance: distance * 0.001 });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.distance !== this.state.distance || prevState.fee !== this.state.fee) {
      let total = (this.state.distance * this.state.fee).toFixed(2);
      this.setState({ total });
    }
  }

  handleVehicleChange = (event) => {
    let { name, value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        vehicle: value,
        fee: vehicles[value],
      };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="input-list">
          <label htmlFor="vehicle">Vehicle</label>
          <select name="vehicle" onChange={this.handleVehicleChange}>
            <option value="none">None</option>
            <option value="truck">Truck</option>
            <option value="van">Van</option>
            <option value="car">Car</option>
            <option value="motorbike">Motorbike</option>
          </select>
          <label htmlFor="distance">Distance</label>
          <input
            name="distance"
            type="number"
            placeholder="Distance in km"
            value={this.state.distance}
            onChange={this.handleChange}
          />
          <label htmlFor="distance">Fee</label>
          <input
            name="fee"
            type="number"
            placeholder="Fee in km/h"
            value={this.state.fee}
            onChange={this.handleChange}
          />
          <Searchbox addPosition={this.addPosition}></Searchbox>
          <div className="mapContainer">
            <Gmap positions={this.state.positions} getDistance={this.getDistance}></Gmap>
          </div>
          <h5>Total:</h5>
          <p>{this.state.total} €</p>
        </div>
      </div>
    );
  }
}

export default App;
