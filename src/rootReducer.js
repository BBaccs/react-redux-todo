import { ADD_TODO, REMOVE_TODO, EDIT_TODO } from './actionCreators'

const initialState = {
    todos: [],
    id: 0
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            // debugger;
            const newState = { ...state };
            newState.id++;
            return {
                ...newState,
                todos: [...newState.todos, { task: action.task, id: newState.id }]
            };
        case EDIT_TODO: {
            const editTodos = state.todos.map(val => 
                val.id === action.id ? { ...val, task: action.task } : val
            );
            return { ...state, todos: editTodos };
        }
        case REMOVE_TODO:
            const updatedTodos = state.todos.filter(val => val.id !== action.id);
            return { ...state, todos: updatedTodos };
        default:
            return state;
    }
}