import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './actionCreators'

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
        case UPDATE_TODO:
            const editTodos = state.todos.filter(val => val.id !== action.id);
            newState.id++;
            return { ...state, todos: editTodos };
        case REMOVE_TODO:
            const updatedTodos = state.todos.filter(val => val.id !== action.id);
            return { ...state, todos: updatedTodos };
        default:
            return state;
    }
}