import React from 'react';
import PropTypes from 'prop-types';

const ItemsToDo = props => {
  return (
    <div>
      {props.itemsToDoCount} items left
    </div>
  );
};

ItemsToDo.propTypes = {
  itemsToDoCount: PropTypes.number.isRequired
};

export default ItemsToDo;