import { TodosReducer } from './todos.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    todos: TodosReducer
});