import React, { Component } from 'react';
import Button from './Button';

class SearchButton extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Button onClick={this.props.onClick} className="search icon-only secondary">
        <i className="material-icons">search</i>
      </Button>
    );
  }
}

export default SearchButton;