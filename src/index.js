import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import 'babel-polyfill';
import 'normalize.css';
import './style/index.scss';
import api from './util/API';

import LocationProvider from './util/LocationProvider';

import AppContainer from './components/AppContainer';
import AddButton from './components/AddButton';
import FilterButton from './components/FilterButton';
import Overlay from './components/Overlay';
import Map from './components/Map';
import {Marker} from "react-google-maps";


const Locator = new LocationProvider();

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      location: Locator.get(),
      places: []
    }

    Locator.onChange((location) => {
      console.log('get new loc', location);
      this.setState({ location })
    });

    // load the gluten_free locations
    api.getNodesForMap({
      south: 52.310997483367,
      west: 13.047637939453,
      north: 52.851717861804,
      east: 14.013061523438
    }).then((data) => {
      this.setState({places: data.elements})
    })
  }

  renderMarkers (place) {
    console.log('rendering place:', place)
    return (
      <Marker key={place.id} position={{ lat: place.lat, lng: place.lon}} tags={place.tags} />
    )
  }

  render () {
    return (
      <AppContainer>
        <Map location={ this.state.location } >
          {
            this.state.places.map((place) => this.renderMarkers(place))
          }
        </Map>
        <FilterButton />
        <AddButton />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
