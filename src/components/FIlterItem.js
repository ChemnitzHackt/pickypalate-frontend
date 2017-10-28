import React from 'react';

const FilterItem = props => {
  return (
    <div onClick={props.onClick} className={'filter-item' + (props.selected ? ' selected' : '')} filter={props.filter}>
      <strong>{props.title}</strong>
      <small>({props.description})</small>
    </div>
  );
};

export default FilterItem;