import axios from 'axios';
import * as types from '../constants/ActionTypes';

let nextTodoId = 0;

// Simple action - no async process
export const setAsEditable = (item) => {
    return {
        type: types.SET_AS_EDITABLE,
        item
    }
};

export const setAsNotEditable = () => {
    return {
        type: types.SET_AS_NOT_EDITABLE
    }
};

export const editTodoLabel = (item, newLabel) => {
    return {
        type: types.UPDATE_TODO_NAME,
        item,
        newLabel
    }
};

export const clearCompleted = () => {
    return {
        type: types.CLEAR_COMPLETED
    }
};

export const addTodo = (newItem) => {
    const newTodo = Object.assign({}, newItem, {id: ++nextTodoId});
    return dispatch => {
        axios.post(`/api/todos`, newTodo).then(res => {
            dispatch(fetchAllTodos());
        })
    }
};

// Action with async http request
export const fetchAllTodos = () => {
    return dispatch => {
        axios.get(`/api/todos`).then(res => {
            nextTodoId = res.data.length -1;
            dispatch(todosReceived(res.data));
        });
    };
};

const todosReceived = (allTodos) => {
    return {
        type: types.TODOS_RECEIVED,
        allTodos
    }
};

export const markAsCompleted = (item) => {
    return {
        type: types.MARK_AS_COMPLETE,
        item
    }
};

export const removeTodo = (item) => {
    return dispatch => {
        axios.delete(`/api/todos/${item.id}`).then(res => {
            dispatch(fetchAllTodos());
        })
    }
};