import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ task, removeTodo, editTodo }) => (
    <>
        <span>{task}</span>
        <button onClick={removeTodo}>X</button>
        <button onClick={editTodo}>Edit</button>
    </>
);

Todo.propTypes = {
    task: PropTypes.string.isRequired,
    removeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
};

export default Todo;