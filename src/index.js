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
import SearchButton from './components/SearchButton';
import Overlay from './components/Overlay';
import DetailView from './components/DetailView';
import FilterView from './components/FilterView';
import Map from './components/Map';
import { Marker } from 'react-google-maps';

const Locator = new LocationProvider();

class App extends Component {
  constructor (props) {
    super(props);

    let filters = localStorage.getItem('filters');
    filters = filters && JSON.parse(filters) || ['diet:gluten_free', 'diet:vegan'];

    this.state = {
      location: Locator.get(),
      showAddOverlay: false,
      showDetailOverlay: false,
      places: [],
      filters: filters,
      details: {}
    };

    this.updateFilters = this.updateFilters.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    Locator.onChange(this.updateLocation.bind(this));
    //this.updatePlaces();
  }

  handleAddClick () {
    alert('show details');
  }

  handleMapClick () {
    this.setState({
      showDetailOverlay: false,
      showFilterOverlay: false
    });
  }

  renderMarkers (place) {
    return (
      <Marker
        key={place.id}
        position={{lat: place.lat, lng: place.lon}}
        tags={place.tags}
        onClick={() => this.setState({
          showDetailOverlay: true,
          details: place.tags
        })}
      />
    )
  }

  updateLocation (location) {
    this.setState({ location });
    this.updatePlaces();
  }

  updatePlaces () {
    api.getNodesFromBackend({
      filters: this.state.filters,
      lat: this.state.location.latitude,
      lon: this.state.location.longitude
    }).then((data) => {
      console.log('updated places:', data.elements);
      this.setState({places: data.elements})
    });
  }

  updateFilters (filters) {
    this.setState({ filters });
    localStorage.setItem('filters', JSON.stringify(filters))
    this.updatePlaces();
  }

  render () {
    return (
      <AppContainer>
        <Map onClick={this.handleMapClick} longitude={this.state.location.longitude} latitude={this.state.location.latitude} >
          <Marker position={{lat: this.state.location.latitude, lng: this.state.location.longitude}} />
          {
            this.state.places.map((place) => this.renderMarkers(place))
          }
        </Map>

        <SearchButton />
        <FilterButton onClick={() => this.setState({ showFilterOverlay: !this.state.showFilterOverlay })} />
        {this.state.showAddOverlay === true && <AddView /> }
        {this.state.showFilterOverlay === true && <FilterView filters={this.state.filters} onUpdate={this.updateFilters} /> }
        {this.state.showDetailOverlay === true && <DetailView data={this.state.details} onClose={this.handleMapClick} /> }
        <AddButton onClick={this.handleAddClick} />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
