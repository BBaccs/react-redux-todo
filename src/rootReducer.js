import { ADD_TODO, REMOVE_TODO, EDIT_TODO } from './actionCreators';

const initialState = {
    todos: [],
    id: 0
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO: {
            const newTodo = { task: action.task, id: state.id + 1 };
            return {
                ...state,
                todos: [...state.todos, newTodo],
                id: state.id + 1
            };
        }
        case EDIT_TODO: {
            const editTodos = state.todos.map(val => 
                val.id === action.id ? { ...val, task: action.task } : val
            );
            return { ...state, todos: editTodos };
        }
        case REMOVE_TODO: {
            const updatedTodos = state.todos.filter(val => val.id !== action.id);
            return { ...state, todos: updatedTodos };
        }
        default:
            return state;
    }
}