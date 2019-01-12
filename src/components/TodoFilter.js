import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = props => {
  const { updateFilter, filter } = props;

  return (
    <div>
      <button
        onClick={() => updateFilter('all')}
        className={(filter === 'all') ? "active" : undefined}>All
      </button>
      <button
        onClick={() => updateFilter('active')}
        className={(filter === 'active') ? "active" : undefined}>Active
      </button>
      <button
        onClick={() => updateFilter('completed')}
        className={(filter === 'completed') ? "active" : undefined}>Completed
      </button>
    </div>
  );
};

TodoFilter.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default TodoFilter;