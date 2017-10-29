import React, {Component} from 'react';

import Overlay from './Overlay';
import FilterItem from './FilterItem';

const FILTERS = {
  'diet:pescetarian': {
    title: 'Pescetarian',
    description: 'no land-dwelling meat, but allows fish'
  },
  'diet:vegetarian': {
    title: 'Vegetarian',
    description: 'no fish or meat'
  },
  'diet:lacto_vegetarian': {
    title: 'Lacto-Vegetarian',
    description: 'no fish, meat or eggs'
  },
  'diet:ovo_vegetarian': {
    title: 'Ovo-Vegetarian',
    description: 'no fish, meat or dairy'
  },
  'diet:vegan': {
    title: 'Vegan',
    description: 'no fish, meat, dairy, eggs or any other animal products'
  },
  'diet:fruitarian': {
    title: 'Fruitarian',
    description: 'only fruit, nuts and seeds'
  },
  'diet:raw': {
    title: 'Raw',
    description: 'uncooked and unprocessed only'
  },
  'diet:gluten_free': {
    title: 'Gluten free',
    description: 'no gluten in food'
  },
  'diet:dairy_free': {
    title: 'Dairy free',
    description: 'no milk or other dairy products in food'
  },
  'diet:lactose_free': {
    title: 'Lactose free',
    description: 'no lactose in food'
  },
  'diet:halal': {
    title: 'Halal',
    description: 'permissible for consumption by Muslims'
  },
  'diet:kosher': {
    title: 'Kosher',
    description: 'kosher food'
  }

};

class FilterView extends Component {
  constructor (props) {
    super(props);
    console.log('Filterview Filters');
    console.log(this.props.filters);
    this.state = {
      filters: this.props.filters
    };

    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem ({target}) {
    if (!target.classList.contains('filter-item')) {
      target = target.parentNode;
    }

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
    const filterItems = Object.keys(FILTERS).sort().map((filter, idx) => {
      return (
        <FilterItem onClick={this.onClickItem}
          filter={filter}
          title={FILTERS[filter].title}
          description={FILTERS[filter].description}
          key={idx}
          selected={ this.state.filters.indexOf(filter) !== -1 }
        />
      );
    });

    return (
      <Overlay className="filter-view">
        {filterItems}
      </Overlay>
    );
  }
}

export default FilterView;