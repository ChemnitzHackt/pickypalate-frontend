import React from 'react';

const FilterItem = props => {
  return (
    <div onClick={props.onClick} className={'filter-item' + (props.selected ? ' selected' : '')} filter={props.filter}>{props.title}</div>
  );
};

export default FilterItem;