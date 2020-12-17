import React, { Component } from 'react';
import styled from 'styled-components';

import Searchbox from './Searchbox';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

/* Styled Components */

const InputContainer = styled.div`
  background-color: #edeeef;
  width: 40%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2vh;
  border-radius: 20px;
`;

class Form extends Component {
  state = {
    distance: 0,
    fee: 0,
    positions: [],
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.distance !== this.state.distance && this.props.distance !== 0) {
      this.setState({
        distance: this.props.distance,
      });
    }
    if (prevState.distance !== this.state.distance || prevState.fee !== this.state.fee) {
      let total = (this.state.distance * this.state.fee).toFixed(2);
      this.props.getTotal(total);
    }
  }

  render() {
    return (
      <InputContainer>
        <InputLabel id="vehicleFee">Vehicle</InputLabel>
        <Select id="vehicleFee" name="fee" onChange={this.handleChange}>
          <MenuItem value={0}>Custom</MenuItem>
          <MenuItem value={0.5}>Truck</MenuItem>
          <MenuItem value={0.25}>Van</MenuItem>
          <MenuItem value={0.1}>Car</MenuItem>
          <MenuItem value={0.05}>Motorbike</MenuItem>
        </Select>
        <InputLabel id="distance">Distance</InputLabel>
        <TextField
          id="distance"
          name="distance"
          type="number"
          placeholder="Distance in km"
          value={this.state.distance}
          onChange={this.handleChange}
          helperText="Distance in km"
        />
        <InputLabel id="fee">Fee</InputLabel>
        <TextField
          id="fee"
          name="fee"
          type="number"
          placeholder="Fee in km/h"
          value={this.state.fee}
          onChange={this.handleChange}
          helperText="Price per Km in €"
        />
        <Searchbox addPosition={this.props.addPosition}></Searchbox>
      </InputContainer>
    );
  }
}

export default Form;
