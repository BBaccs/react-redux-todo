import React from 'react';

const Todo = ({ task, removeTodo, editTodo }) => (
    <li>
        {task}
        <button onClick={removeTodo}>X</button>
        <button onClick={editTodo}>Edit</button>
    </li>
);

export default Todo;