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
const isDay = () => {
  const hours = new Date().getHours()
  return hours > 6 && hours < 20
};

// native stuff
if (window.cordova) {
  document.documentElement.classList.add('native');
  document.documentElement.classList.add(window.cordova.platformId);

  const onDeviceReady = () => {
    // StatusBar adjustments
    if (window.StatusBar) {
      if (window.cordova.platformId === 'android') {
        // set statusbar bg color and apply white font color
        window.StatusBar.backgroundColorByHexString('#673ab7');
        window.StatusBar.styleLightContent();
      } else {
        // set statusbar transparent bg and apply white font color according to day/night theme
        window.StatusBar.overlaysWebView(true);
        window.StatusBar[isDay() ? 'styleDefault' : 'styleLightContent']();
      }
    }
  };

  document.addEventListener('deviceready', onDeviceReady, false);
}


class App extends Component {
  constructor (props) {
    super(props);

    let filters = window.localStorage.getItem('filters');
    filters = filters && JSON.parse(filters) || ['diet:gluten_free', 'diet:vegan'];

    this.state = {
      location: Locator.get(),
      showAddOverlay: false,
      showDetailOverlay: false,
      places: [],
      filters: filters,
      details: {},
      isDay: isDay()
    };

    this.updateFilters = this.updateFilters.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);

    Locator.onChange(this.updateLocation.bind(this));
  }

  handleAddClick () {
    alert('show details');
  }

  handleMapClick () {
    this.setState({
      showDetailOverlay: false,
      showFilterOverlay: false,
      showTagsOverlay: false,
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
          details: place
        })}
      />
    )
  }

  updateLocation (location) {
    this.setState({ location });
    this.updatePlaces();
  }

  updatePlaces () {
    console.log('update places');
    api.getNodesForMap({
      filters: this.state.filters,
      south: this.state.location.latitude - 0.5,
      west: this.state.location.longitude - 0.5,
      north: this.state.location.latitude + 0.5,
      east: this.state.location.longitude + 0.5
    }).then((data) => {
      this.setState({places: data.elements || []})
    });
  }

  updateFilters (filters) {
    this.setState({ filters });
    window.localStorage.setItem('filters', JSON.stringify(filters))
    this.updatePlaces();
  }

  updateTags (tags) {
    var details = this.state.details;
    details.tags = tags;


    this.setState({ details });
    api.updateNode(details);
    console.log(details);
    this.updatePlaces();
  }

  render () {
    return (
      <AppContainer>
        <Map onClick={this.handleMapClick} longitude={this.state.location.longitude} latitude={this.state.location.latitude} isDay={this.state.isDay} >
          <Marker position={{lat: this.state.location.latitude, lng: this.state.location.longitude}} />
          { this.state.places.map((place) => this.renderMarkers(place)) }
        </Map>

        <SearchButton />
        <FilterButton onClick={() => this.setState({ showFilterOverlay: !this.state.showFilterOverlay })} />
        {this.state.showAddOverlay === true && <AddView /> }
        {this.state.showFilterOverlay === true && <FilterView filters={this.state.filters} onUpdate={this.updateFilters} /> }
        {this.state.showTagsOverlay === true && <FilterView filters={this.state.details.tags} onUpdate={this.updateTags} /> }
        {this.state.showDetailOverlay === true && <DetailView data={this.state.details.tags} onClose={this.handleMapClick}> 
          <FilterButton onClick={() => this.setState({ showTagsOverlay: !this.state.showFilterOverlay })} / >
        </DetailView>
        }
        <AddButton onClick={this.handleAddClick} />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
