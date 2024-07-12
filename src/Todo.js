import React from 'react';

const Todo = ({ task, removeTodo, updateTodo }) => (
    <li>
        {task}
        <button onClick={removeTodo}>X</button>
        <button onClick={updateTodo}>Edit</button>
    </li>
);

export default Todo;