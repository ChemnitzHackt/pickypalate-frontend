import React, { Component } from 'react';
import Button from './Button';

class PositionButton extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Button onClick={this.props.onClick} className="add-marker icon-only primary">
        <i className="material-icons">gps_fixed</i>
      </Button>
    );
  }
}

export default PositionButton;