import React, {Component} from 'react';
import {TodoItem} from './TodoItem/TodoItem'
import './App.css';

class App extends Component {
        state = {
            todos: [
                {
                    id: 1,
                    name: 'task 1',
                    completed: false,
                    editing: false
                },
                {
                    id: 2,
                    name: 'task 2',
                    completed: false,
                    editing: false
                },
                {
                    id: 3,
                    name: 'task 3',
                    completed: false,
                    editing: false
                }
            ],
            newTodo: '',
            editable: {
                newVal: '',
                oldVal: ''
            }
        };
    render() {
        let todoItems = this.state.todos.map((todo, index) => {
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
        const completedTodoos = this.state.todos.filter(todo => todo.completed).length;
        const totalTodoos = this.state.todos.length;
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
        if(item) {
            let todoArr = this.state.todos.map(todo => {
                if(todo.name === item.name) {
                    return Object.assign({}, todo, {completed: !item.completed});
                } else {
                    return todo;
                }
            });
            this.setState({todos: todoArr});
        }
    };

    removeItem = (item) => {
        const todoArr = this.state.todos.filter(todo => {
            return todo.name !== item.name;
        });
        this.setState({todos: todoArr});
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
            this.setState({todos: this.state.todos.concat(newTodo), newTodo: ''});
        }
    };
    setAsEditable = (item) => {
        if(item) {
            let todoArr = this.state.todos.map(todo => {
                if(todo.name === item.name) {
                    return Object.assign({}, todo, {editing: !item.editing});
                } else {
                    return Object.assign({}, todo, {editing: false});
                }
            });
            this.setState({todos: todoArr, editable: {newVal: item.name, oldVal: item.name}});
        }
    };
    handleEditItem = (event) => {
        const newEditValues = Object.assign({}, this.state.editable, {newVal: event.target.value});
        this.setState({editable: newEditValues});
    };
    handleSubmitEdit = (event) => {
        if(event.key === 'Enter') {
            const editItem = this.state.editable.oldVal;
            let todoArr = this.state.todos.map(todo => {
                if(todo.name === editItem) {
                    return Object.assign({}, todo, {name: this.state.editable.newVal, editing: false});
                } else {
                    return Object.assign({}, todo, {editing: false});
                }
            });
            this.setState({todos: todoArr, editable: {newVal: '', oldVal: ''}});
        } else if (event.keyCode === 27 || event.type === 'blur') {
            let todoArr = this.state.todos.map(todo => {
                return Object.assign({}, todo, {editing: false});
            });
            this.setState({todos: todoArr, editable: {newVal: '', oldVal: ''}});
        }
    };
    clearCompleted = () => {
        const filteredTodos = this.state.todos.filter(todo => {
            return !todo.completed;
        });
        this.setState({todos: filteredTodos});
    }
}


export default App;


