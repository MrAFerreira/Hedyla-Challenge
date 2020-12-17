import './App.css';
import React, { Component } from 'react';
import styled from 'styled-components';

import Form from './components/Form';
import Gmap from './components/Gmap';

/* Styled Components*/

const PositionsUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0px;
  background-color: white;
  color: black;
  border-radius: 10px;
`;

const PositionsLi = styled.li`
  width: 20vw;
`;

/* App */

class App extends Component {
  state = {
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
    this.setState({ distance: (distance * 0.001).toFixed(2) });
    console.log(this.state.distance);
  };

  getTotal = (total) => {
    this.setState({ total });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">Cost calculator</h1>
        <p>
          Add the distance and fee of your trip or use one of our presets and search your adress
          directly.
        </p>
        <div className="main">
          <Form
            getTotal={this.getTotal}
            distance={this.state.distance}
            addPosition={this.addPosition}
          />

          <div className="mapContainer">
            <Gmap positions={this.state.positions} getDistance={this.getDistance}></Gmap>
          </div>
        </div>
        <PositionsUl>
          {this.state.positions.map((position) => {
            return <PositionsLi>{position.name}</PositionsLi>;
          })}
        </PositionsUl>
        <div className="total-container">
          <h2>Total:</h2>
          <h3>{this.state.total} €</h3>
        </div>
      </div>
    );
  }
}

export default App;
