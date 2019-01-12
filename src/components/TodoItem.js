import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
  const { todo, index, checkTodo, editTodo, doneEdit, cancelEdit, deleteTodo } = props;
  const { id, completed, editing, title } = props.todo;

  return (
    <div key={id} className="todo-item">
      <div className="todo-item-left">
        <input
          onChange={() => checkTodo(todo, index)}
          type="checkbox"
          className="todo-item-done"
          checked={completed}
        />

        {!editing &&
          <div
            className={completed ? 'todo-item-label completed' : 'todo-item-label'}
            onClick={() => editTodo(todo, index)}
          >
            {title}
          </div>
        }
        {editing &&
          <input
            className="todo-item-edit"
            type="text"
            autoFocus
            defaultValue={title}
            onBlur={(e) => doneEdit(todo, index, e)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                doneEdit(todo, index, e);
              } else if (e.key === 'Escape') {
                cancelEdit(todo, index);
              };
            }} />
        }
      </div>
      <div onClick={() => deleteTodo(props.todo.id)} className="remove-item">
        &times;
              </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  checkTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;