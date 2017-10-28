import React, { Component } from 'react';
import Button from './Button';

class AddButton extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Button className="add-marker icon-only primary">
        <i className="material-icons">add_location</i>
      </Button>
    );
  }
}

export default AddButton;