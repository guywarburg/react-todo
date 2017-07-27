import React, { Component } from 'react';
import '../App.css';

export class TodoItem extends Component {
    componentDidUpdate(){
        this.nameInput.focus();
    }
    render() {
        return (
            <li className={this.props.todo.editing ? 'editing' : ''}>
                <div className="view">
                    <input type="checkbox"
                           className="toggle"
                           checked={this.props.todo.completed}
                           onChange={this.handleChange}/>
                    <label className={this.props.todo.completed ? 'completed' : ''}
                        onClick={this.setAsEditable}>{ this.props.todo.name}</label>
                    <button className="destroy" onClick={this.handleDestroy} />
                </div>
                <input className="edit"
                       ref={(input) => { this.nameInput = input; }}
                    value={this.props.editable}
                    onChange={this.props.handleEditItem}
                    onKeyDown={this.props.handleSubmitEdit}
                    onBlur={this.props.handleSubmitEdit}/>
            </li>
        );
    }
    handleChange = () => {
        this.props.markAsCompleted(this.props.todo);
    };
    handleDestroy = () => {
        this.props.onDestroy(this.props.todo);
    };
    setAsEditable = () => {
        this.props.setAsEditable(this.props.todo);
    };

}