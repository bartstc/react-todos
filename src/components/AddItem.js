import React from 'react';
import PropTypes from 'prop-types';

const AddItem = props => {
  return (
    <input
      onChange={props.handleChange}
      onKeyUp={props.addTodo}
      name="inputValue"
      value={props.inputValue}
      type="text"
      className="todo-input"
    />
  );
};

AddItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired
};

export default AddItem;