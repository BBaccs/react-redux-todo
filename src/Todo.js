import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ task, removeTodo, editTodo }) => (
    <li>
        {task}
        <button onClick={removeTodo}>X</button>
        <button onClick={editTodo}>Edit</button>
    </li>
);

Todo.propTypes = {
    task: PropTypes.string.isRequired,
    removeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
};

export default Todo;