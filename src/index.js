import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'normalize.css';
import './style/index.scss';
import api from './util/API';

import LocationProvider from './util/LocationProvider';
import AppContainer from './components/AppContainer';
import AddButton from './components/AddButton';
import FilterButton from './components/FilterButton';
import Overlay from './components/Overlay';
import DetailView from './components/DetailView';
import Map from './components/Map';
import { Marker } from 'react-google-maps';


const Locator = new LocationProvider();

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      location: Locator.get(),
      showAddOverlay: false,
      showDetailOverlay: false,
      places: [],
      filters: ['diet:gluten_free', 'diet:vegan']
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    Locator.onChange(this.updateLocation.bind(this));
  }

  handleAddClick () {
    alert('show details');
  }

  renderMarkers (place) {
    console.log('rendering place:', place)
    return (
      <Marker
        key={place.id}
        position={{lat: place.lat, lng: place.lon}} 
        tags={place.tags}
        onClick={() => this.setState({
          showDetailOverlay: true,
          details: place.tags.name
        })}
      />
    )
  }

  updateLocation (location) {
    this.setState({ location });
    this.updatePlaces();
  }

  updatePlaces () {
    api.getNodesForMap({
      filters: this.state.filters,
      south: this.state.location.latitude - 0.5,
      west: this.state.location.longitude - 0.5,
      north: this.state.location.latitude + 0.5,
      east: this.state.location.longitude + 0.5
    }).then((data) => {
      this.setState({places: data.elements})
    });
  }

  render () {
    return (
      <AppContainer>
        <Map longitude={this.state.location.longitude} latitude={this.state.location.latitude} >
          <Marker position={{lat: this.state.location.latitude, lng: this.state.location.longitude}} />
          {
            this.state.places.map((place) => this.renderMarkers(place))
          }
        </Map>
        <FilterButton />
        {this.state.showAddOverlay === true && <AddView /> }
        {this.state.showDetailOverlay === true &&
          <Overlay> 
            <DetailView /> 
          </Overlay> }
        <AddButton onClick= {this.handleAddClick} />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
