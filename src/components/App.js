import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../App.css';

import ItemsToDo from './ItemsToDo';
import TodoItem from './TodoItem';
import CheckAll from './CheckAll';
import TodoFilter from './TodoFilter';
import AddItem from './AddItem';

class App extends Component {
  state = {
    filter: 'all',
    beforeEditCache: '',
    inputValue: '',
    id: uuid(),
    todos: []
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  addTodo = e => {
    if (e.key === 'Enter') {
      const value = this.state.inputValue;
      if (!value) return;

      const newItem = {
        id: this.state.id,
        title: value,
        completed: false,
        editing: false
      };

      const todos = [...this.state.todos, newItem];
      this.setState({
        todos,
        id: uuid(),
        inputValue: ''
      });
    };
  };

  deleteTodo = id => this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });

  checkTodo = (todo, index) => {
    this.setState((prevState) => {
      let todos = prevState.todos;
      todo.completed = !todo.completed;
      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  editTodo = (todo, index) => {
    this.setState((prevState) => {
      let todos = prevState.todos;
      todo.editing = true;
      todos.splice(index, 1, todo);

      return { todos, beforeEditCache: todo.title };
    });
  };

  doneEdit = (todo, index, e) => {
    e.persist();

    this.setState((prevState) => {
      let todos = prevState.todos;
      todo.editing = false;

      if (e.target.value.trim().length === 0) {
        todo.title = prevState.beforeEditCache;
      } else {
        todo.title = e.target.value;
      };

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  cancelEdit = (todo, index) => {
    this.setState((prevState) => {
      let todos = prevState.todos;
      todo.title = prevState.beforeEditCache;
      todo.editing = false;

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  itemsToDoCount = () => this.state.todos.filter(todo => !todo.completed).length;

  todosCompletedCount = () => this.state.todos.filter(todo => todo.completed).length;

  clearCompleted = () => this.setState({ todos: this.state.todos.filter(todo => !todo.completed) });

  updateFilter = filter => this.setState({ filter });

  filterTodos = () => {
    if (this.state.filter === 'all') {
      return this.state.todos;
    } else if (this.state.filter === 'active') {
      return this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.filter === 'completed') {
      return this.state.todos.filter(todo => todo.completed);
    }

    return this.state.todos;
  };

  checkAllTodos = (e) => {
    e.persist();
    this.setState((prevState) => {
      let todos = prevState.todos;
      todos.forEach(todo => todo.completed = e.target.checked);

      return { todos };
    });
  };

  anyChecked = () => this.itemsToDoCount() !== 0;

  render() {
    return (
      <div className="App">
        <div className="Todo-container">
          <h1 className="heading">Todo</h1>

          <AddItem
            handleChange={this.handleChange}
            addTodo={this.addTodo}
            inputValue={this.state.inputValue}
          />

          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {this.filterTodos().map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                checkTodo={this.checkTodo}
                editTodo={this.editTodo}
                doneEdit={this.doneEdit}
                cancelEdit={this.cancelEdit}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ReactCSSTransitionGroup>

          {this.state.todos.length !== 0 &&
            <Fragment>
              <div className="extra-container">
                <CheckAll
                  checkAllTodos={this.checkAllTodos}
                  anyChecked={this.anyChecked}
                />
                <ItemsToDo
                  itemsToDoCount={this.itemsToDoCount()}
                />
              </div>

              <div className="extra-container">
                <TodoFilter
                  updateFilter={this.updateFilter}
                  filter={this.state.filter}
                />

                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}>
                  {this.todosCompletedCount() > 0 &&
                    <div>
                      <button onClick={this.clearCompleted}>Clear Completed</button>
                    </div>
                  }
                </ReactCSSTransitionGroup>
              </div>
            </Fragment>
          }

        </div>
      </div>
    );
  }
}

export default App;
