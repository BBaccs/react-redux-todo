import React, { Component, createRef } from 'react';
import Todo from './Todo';
import { connect } from "react-redux";
import { ADD_TODO, REMOVE_TODO, EDIT_TODO } from './actionCreators';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { task: '', editTask: '', editTaskIndex: null };
    this.editInputRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.saveEditTodo = this.saveEditTodo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch({
      type: ADD_TODO,
      task: this.state.task
    });
    this.setState({ task: '' });
    e.target.reset();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  removeTodo(id) {
    this.props.dispatch({ type: REMOVE_TODO, id });
  }

  editTodo = (index, task) => {
    this.setState({ editTask: task, editTaskIndex: index }, () => {
      if (this.editInputRef.current) {
        this.editInputRef.current.focus();
      }
    });
  }

  handleEditChange(e) {
    this.setState({ editTask: e.target.value });
  }

  saveEditTodo = (id) => {
    this.props.dispatch({ type: EDIT_TODO, id, task: this.state.editTask });
    this.setState({ editTask: '', editTaskIndex: null });
  }

  handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      this.saveEditTodo(id);
    }
  }

  render() {
    let todos = this.props.todos.map((val, index) => {
      return (
        <li key={val.id}>
          {this.state.editTaskIndex === index ? (
            <input
              ref={this.editInputRef}
              type="text"
              value={this.state.editTask}
              onChange={this.handleEditChange}
              onBlur={() => this.saveEditTodo(val.id)}
              onKeyPress={(e) => this.handleEditKeyPress(e, val.id)}
              autoFocus
            />
          ) : (
            <Todo
              removeTodo={() => this.removeTodo(val.id)}
              editTodo={() => this.editTodo(index, val.task)}
              task={val.task}
            />
          )}
        </li>
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-default">Add Todo</button>
        </form>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  };
}

export default connect(mapStateToProps)(TodoList);