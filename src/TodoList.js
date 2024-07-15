import React, { Component, createRef } from 'react';
import { connect } from "react-redux";
import { addTodo, removeTodo, editTodo } from './actionCreators';
import Todo from './Todo';
import PropTypes from 'prop-types';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { task: '', editTask: '', editTaskIndex: null };
    this.editInputRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.saveEditTodo = this.saveEditTodo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.task.length > 0) {
      this.props.addTodo(this.state.task);
      this.setState({ task: '' });
      e.target.reset();
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditChange(e) {
    this.setState({ editTask: e.target.value });
  }

  editTodo = (index, task) => {
    this.setState({ editTask: task, editTaskIndex: index }, () => {
      if (this.editInputRef.current) {
        this.editInputRef.current.focus();
      }
    });
  }

  saveEditTodo = (id) => {
    this.props.editTodo(id, this.state.editTask);
    this.setState({ editTask: '', editTaskIndex: null });
  }

  handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      this.saveEditTodo(id);
    }
  }

  render() {
    const { todos, removeTodo } = this.props;
    const { task, editTask, editTaskIndex } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-default">Add Todo</button>
        </form>
        <ul>
          {todos.map((val, index) => (
            <li key={val.id}>
              {editTaskIndex === index ? (
                <input
                  ref={this.editInputRef}
                  type="text"
                  value={editTask}
                  onChange={this.handleEditChange}
                  onBlur={() => this.saveEditTodo(val.id)}
                  onKeyPress={(e) => this.handleEditKeyPress(e, val.id)}
                  autoFocus
                />
              ) : (
                <Todo
                  removeTodo={() => removeTodo(val.id)}
                  editTodo={() => this.editTodo(index, val.task)}
                  task={val.task}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = {
  addTodo,
  removeTodo,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);