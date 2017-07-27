import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TodoItem} from './TodoItem/TodoItem'
import './App.css';
import {bindActionCreators} from "redux";
import * as todoActions from "./actions/todos.actions";

class App extends Component {
    constructor() {
        super();
        this.state = {
            newTodo: '',
            editable: {
                newVal: '',
                oldVal: ''
            }
        };
    }
    componentDidMount() {
        this.props.dispatch(todoActions.fetchAllTodos());
    }
    render() {
        let todoItems = this.props.todos.map((todo, index) => {
            return (
                <TodoItem
                    key={index}
                    todo={todo}
                    editable={this.state.editable.newVal}
                    onDestroy={this.removeItem}
                    markAsCompleted={this.markItemAsComplete}
                    setAsEditable={this.setAsEditable}
                    handleEditItem={this.handleEditItem}
                    handleSubmitEdit={this.handleSubmitEdit}/>)
        });
        const completedTodoos = this.props.todos.filter(todo => todo.completed).length;
        const totalTodoos = this.props.todos.length;
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>Todos</h1>
                        <input className="new-todo" placeholder="What needs to be done?" value={this.state.newTodo}
                               onChange={this.handleNewTodo} onKeyPress={this.handleSubmit}/>
                    </header>
                    <section className="main">
                        <input className="toggle-all" type="checkbox"/>
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        <ul className="todo-list">
                            { todoItems }
                        </ul>
                    </section>
                    <footer className="footer">
                        <span className="todo-count">
                            {completedTodoos} / {totalTodoos}
                        </span>
                        <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
                    </footer>
                </section>
            </div>
        );
    }

    markItemAsComplete = (item) => {
        this.props.dispatch(todoActions.markAsCompleted(item));
    };

    removeItem = (item) => {
        this.props.dispatch(todoActions.removeTodo(item));
    };

    handleNewTodo = (event) => {
        this.setState({newTodo: event.target.value});
    };

    handleSubmit = (event) => {
        if(event.key === 'Enter') {
            const newTodo = {
                name: this.state.newTodo,
                completed: false,
                editing: false
            };
            this.setState({newTodo: ''});
            this.props.dispatch(todoActions.addTodo(newTodo));
        }
    };
    setAsEditable = (item) => {
        this.props.dispatch(todoActions.setAsEditable(item));
        this.setState({editable: {newVal: item.name, oldVal: item.name}});
    };
    handleEditItem = (event) => {
        const newEditValues = Object.assign({}, this.state.editable, {newVal: event.target.value});
        this.setState({editable: newEditValues});
    };
    handleSubmitEdit = (event) => {
        const editItem = this.props.todos.find(todo => {
            return todo.name === this.state.editable.oldVal;
        });
        console.log('editItem', editItem);
        if(event.key === 'Enter') {
            this.props.dispatch(todoActions.editTodoLabel(editItem, this.state.editable.newVal));
            this.setState({editable: {newVal: '', oldVal: ''}});
        } else if (event.keyCode === 27 || event.type === 'blur') {
            this.props.dispatch(todoActions.setAsNotEditable());
            this.setState({editable: {newVal: '', oldVal: ''}});
        }
    };
    clearCompleted = () => {
        this.props.dispatch(todoActions.clearCompleted());
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);