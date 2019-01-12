import React from 'react';
import PropTypes from 'prop-types';

const CheckAll = props => {
  return (
    <label className="extra-container-label">
      <input
        className="todo-item-done"
        type="checkbox"
        onChange={props.checkAllTodos}
        checked={!props.anyChecked()} />Check All
    </label>
  );
};

CheckAll.propTypes = {
  checkAllTodos: PropTypes.func.isRequired,
  anyChecked: PropTypes.func.isRequired
};

export default CheckAll;