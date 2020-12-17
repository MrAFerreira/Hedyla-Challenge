import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import styled from 'styled-components';

/* Styled Components */

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0px;
  background-color: white;
  color: black;
  position: fixed;
  z-index: 2;
`;

const StyledLi = styled.li`
  text-align: left;
  height: 100%;
  padding: 10px;
  &:hover {
    background-color: lightgray;
  }
`;

class Searchbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: '',
      lng: '',
      name: '',
    };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    let name;
    geocodeByAddress(address)
      .then((results) => {
        name = results[0].formatted_address;
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        this.setState({ lat: latLng.lat, lng: latLng.lng, name });
        this.props.addPosition({ lat: this.state.lat, lng: this.state.lng, name: this.state.name });
      })
      .catch((error) => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <StyledUl className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                return (
                  <StyledLi {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </StyledLi>
                );
              })}
            </StyledUl>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Searchbox;
