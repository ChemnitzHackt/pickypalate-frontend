import React, { Component } from 'react';
import Button from './Button';

class FilterButton extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Button onClick={this.props.onClick} className="filters icon-only secondary">
        <i className="material-icons">{this.props.icon || 'filter_list'}</i>
      </Button>
    );
  }
}

export default FilterButton;