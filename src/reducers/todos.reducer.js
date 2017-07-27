import {TodosActions } from '../actions/todos.actions';

export function TodosReducer(state = [], action) {
    switch (action.type) {
        case TodosActions.FETCH_TODOS:
            return action.payload;
        case TodosActions.MARK_AS_COMPLETE:
            const tempState = state.map(todo => {
                if(todo.name === action.payload.name) {
                    return action.payload;
                } else {
                    return todo;
                }
            });
            console.log('tempState', tempState);
            return tempState;
        default:
            return state;
    }
}