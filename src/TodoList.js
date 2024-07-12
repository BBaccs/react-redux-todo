import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from "react-redux";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './actionCreators'; // Import the action creator

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { task: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch({
      type: ADD_TODO,
      task: this.state.task
    });
    this.setState({
      task: ''
    })
    e.target.reset();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  removeTodo(id) {
    this.props.dispatch({
      type: REMOVE_TODO,
      id
    })
  }
  updateTodo(id, task) {
    this.props.dispatch({
      type: UPDATE_TODO,
      id,
      task
    })
  }

  render() {
    let todos = this.props.todos.map((val, index) => {
      return <Todo removeTodo={() => this.removeTodo(val.id)} updateTodo={() => this.updateTodo(val.id, val.task)} task={val.task} key={index} />;
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={this.state.task} // Controlled input
            onChange={this.handleChange} />
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
  }
}

export default connect(mapStateToProps)(TodoList);