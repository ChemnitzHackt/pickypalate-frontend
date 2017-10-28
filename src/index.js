import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'normalize.css';
import './style/index.scss';

import AppContainer from './components/AppContainer';
import Overlay from './components/Overlay';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render () {
    return (
      <AppContainer>
        <Overlay></Overlay>
      </AppContainer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));