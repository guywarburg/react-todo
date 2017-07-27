import { TodosActions } from '../actions/todos.actions';
import axios from 'axios';

export const middleware = (store) => (next) => (action) => {
    switch (action.type) {
        case TodosActions.FETCH_TODOS:
            axios.get(`/api/todos`).then((res) => {
                action.payload = res.data;
                next(action);
            })
            .catch(err => {
                console.log('err', err);
            });
            break;
        case TodosActions.MARK_AS_COMPLETE:
            axios.patch(`/api/todos/${action.payload.i}`, 
                {
                    completed: !action.payload.item.completed
                }).then((res) => {
                next({
                    type: action.type,
                    payload: res.data
                });
            }).catch(err => console.log('err', err));
            break;
        case TodosActions.DELETE:
            axios.delete(`/api/todos/${action.payload.i}`)
                .then((res) => {
                    axios.get(`/api/todos`).then((res) => {
                        action.payload = res.data;
                        action.type = TodosActions.FETCH_TODOS;
                        next(action);
                    })
                }).catch(err => console.log('err', err));
            break;
        case TodosActions.ADD:
            axios.post(`/api/todos`, action.payload)
                .then((res) => {
                    axios.get(`/api/todos`).then((res) => {
                        action.payload = res.data;
                        action.type = TodosActions.FETCH_TODOS;
                        next(action);
                    })
                }).catch(err => console.log('err', err));
            break;
        default:
            next(action);
    }
};