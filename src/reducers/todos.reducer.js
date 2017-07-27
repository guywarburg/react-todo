import * as types from '../constants/ActionTypes'

export function TodosReducer(state = [], action) {
    switch (action.type) {
        case types.TODOS_RECEIVED:
            return action.allTodos;
        case types.MARK_AS_COMPLETE:
            return state.map(todo =>
                (todo.id === action.item.id)
                    ? {...todo, completed: !todo.completed}
                    : todo
            );
        case types.ADD:
            return [...state, action.newTodo];
        case types.SET_AS_EDITABLE:
            return state.map(todo =>
                (todo.id === action.item.id)
                    ? {...todo, editing: true}
                    : {...todo, editing: false}
            );
        case types.SET_AS_NOT_EDITABLE:
            return state.map(todo =>
                (todo.editing)
                    ? {...todo, editing: false}
                    : todo
            );
        case types.UPDATE_TODO_NAME:
            return state.map(todo =>
                (todo.id === action.item.id)
                    ? {...todo, name: action.newLabel, editing: false}
                    : todo
            );
        case types.CLEAR_COMPLETED:
            return state.filter(todo => {
                return !todo.completed;
            });
        default:
            return state;
    }
}