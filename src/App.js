import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>Todos</h1>
                        <input className="new-todo" placeholder="What needs to be done?"/>
                    </header>
                    <section className="main">
                        <input className="toggle-all" type="checkbox"/>
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        <ul className="todo-list">
                        </ul>
                    </section>
                    <footer className="footer">
                        <span className="todo-count">
                        </span>
                        <button className="clear-completed"></button>
                    </footer>
                </section>
            </div>
        );
    }
}


export default App;


