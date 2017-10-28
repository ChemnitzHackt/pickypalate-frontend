import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'normalize.css';
import './style/index.scss';

import LocationProvider from './util/LocationProvider';

import AppContainer from './components/AppContainer';
import AddButton from './components/AddButton';
import Overlay from './components/Overlay';

const Locator = new LocationProvider();

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      location: Locator.get()
    };

    Locator.onChange(location => this.setState({ location }));
  }

  render () {
    return (
      <AppContainer>
        <AddButton />
        <Overlay />
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
