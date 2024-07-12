import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from "react-redux";
import { ADD_TODO } from './actionCreators'; // Import the action creator

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const task = e.target.task.value.trim();
    if (task) {
      this.props.dispatch({
        type: ADD_TODO,
        task: this.state.task
      });
      e.target.reset();
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    let todos = this.props.todos.map((val, index) => (
      <Todo task={val.task} key={index} />
    ));
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task</label>
          <input type="text" name="task" id="task" onChange={this.handleChange} />
          <button type="button" className="btn btn-default">add todo</button>
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