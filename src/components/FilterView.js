import React, {Component} from 'react';

import Overlay from './Overlay';
import FilterItem from './FilterItem';

const FILTERS = {
  'diet:gluten_free': {
    title: 'Gluten free'
  },
  'diet:vegetarian': {
    title: 'Vegetarian'
  },
  'diet:vegan': {
    title: 'Vegan'
  }
};

class FilterView extends Component {
  constructor (props) {
    super(props);

    this.state = {
      filters: this.props.filters
    };

    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem ({target}) {
    const filter = target.getAttribute('filter');
    const filters = JSON.parse(JSON.stringify(this.state.filters));
    const idx = filters.indexOf(filter);

    if (idx >= 0) {
      filters.splice(idx, 1);
    } else {
      filters.push(filter);
    }

    this.setState({ filters: filters });
    this.props.onUpdate(filters);
  }

  render () {
    const filterItems = Object.keys(FILTERS).map((filter, idx) => {
      return <FilterItem onClick={this.onClickItem} filter={filter} title={FILTERS[filter].title} key={idx} selected={ this.state.filters.indexOf(filter) !== -1 } />
    });

    return (
      <Overlay className="filter-view">
        {filterItems}
      </Overlay>
    );
  }
}

export default FilterView;