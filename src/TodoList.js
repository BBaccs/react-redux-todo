import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, editTodo } from './actionCreators';
import Todo from './Todo';
import PropTypes from 'prop-types';

const TodoList = () => {
    const [task, setTask] = useState('');
    const [editTask, setEditTask] = useState('');
    const [editTaskIndex, setEditTaskIndex] = useState(null);
    const editInputRef = useRef(null);

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (task.length > 0) {
            dispatch(addTodo(task));
            setTask('');
            e.target.reset();
        }
    }, [task, dispatch]);

    const handleChange = useCallback((e) => {
        setTask(e.target.value);
    }, []);

    const handleEditChange = useCallback((e) => {
        setEditTask(e.target.value);
    }, []);

    const editTodoHandler = useCallback((index, task) => {
        setEditTask(task);
        setEditTaskIndex(index);
        setTimeout(() => {
            if (editInputRef.current) {
                editInputRef.current.focus();
            }
        }, 0);
    }, []);

    const saveEditTodo = useCallback((id) => {
        dispatch(editTodo(id, editTask));
        setEditTask('');
        setEditTaskIndex(null);
    }, [editTask, dispatch]);

    const handleEditKeyPress = useCallback((e, id) => {
        if (e.key === 'Enter') {
            saveEditTodo(id);
        }
    }, [saveEditTodo]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task</label>
                <input
                    type="text"
                    name="task"
                    id="task"
                    value={task}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-default">Add Todo</button>
            </form>
            <ul>
                {todos.map((val, index) => (
                    <li key={val.id}>
                        {editTaskIndex === index ? (
                            <input
                                ref={editInputRef}
                                type="text"
                                value={editTask}
                                onChange={handleEditChange}
                                onBlur={() => saveEditTodo(val.id)}
                                onKeyPress={(e) => handleEditKeyPress(e, val.id)}
                                autoFocus
                            />
                        ) : (
                            <Todo
                                removeTodo={() => dispatch(removeTodo(val.id))}
                                editTodo={() => editTodoHandler(index, val.task)}
                                task={val.task}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
};

export default TodoList;
