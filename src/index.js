import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'normalize.css';
import './style/index.scss';
import api from './util/API';

import LocationProvider from './util/LocationProvider';
import AppContainer from './components/AppContainer';
import PositionButton from './components/PositionButton';
import FilterButton from './components/FilterButton';
import SearchButton from './components/SearchButton';
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
      showSearch: false,
    };

    this.handleMyPositionClick = this.handleMyPositionClick.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.updateLocationManual = this.updateLocationManual.bind(this);
    Locator.onChange(this.updateLocation.bind(this));
  }

  handleMyPositionClick () {
    Locator.switchToAutomaticMode();
  }

  handleMapClick () {
    // hide details
    if(this.state.showDetailOverlay)
      this.setState({showDetailOverlay:false});
  }

  renderMarkers (place) {
    console.log('rendering place:', place)
    return (
      <Marker key={place.id} position={{ lat: place.lat, lng: place.lon}} tags={place.tags} onClick={() => this.setState({showDetailOverlay:true, details:place.tags.name})}/>
    )
  }

  toggleSearch () {
    this.setState({showSearch: !this.state.showSearch});
  }

  updateLocation (location) {
    this.setState({ location });
    this.updatePlaces();
  }

  updatePlaces () {
    api.getNodesForMap({
      south: this.state.location.latitude - 0.5,
      west: this.state.location.longitude - 0.5,
      north: this.state.location.latitude + 0.5,
      east: this.state.location.longitude + 0.5
    }).then((data) => {
      this.setState({places: data.elements})
    });
  }

  updateLocationManual(lat, lng) {
    Locator.switchToManualMode(lat, lng);
  }

  render () {
    return (
      <AppContainer>
        <Map showSearch={this.state.showSearch} onLatLngChange={this.updateLocationManual} onClick={this.handleMapClick} longitude={this.state.location.longitude} latitude={this.state.location.latitude} >
          <Marker position={{ lat: this.state.location.latitude, lng: this.state.location.longitude}} />
          {
            this.state.places.map((place) => this.renderMarkers(place))
          }
        </Map>
        <SearchButton onClick={this.toggleSearch}/>
        <FilterButton />
        {this.state.showAddOverlay === true && <AddView /> }
        {this.state.showDetailOverlay === true &&
          <Overlay > 
            <DetailView onClose={this.handleMapClick}/> 
          </Overlay> }
        <PositionButton onClick= {this.handleMyPositionClick} />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
