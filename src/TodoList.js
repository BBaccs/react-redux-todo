import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ['eat', 'have fun', 'other stuff']
    };
  }

  render() {
    let todos = this.state.todos.map((task, index) => (
        <Todo task={task} key={index} />
    ));
    return (
      <div>
        <ul>
            {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;
