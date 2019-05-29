import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
        /*Call parent's constructor*/
        super(props);

        // Bind methods to class
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: 'Low',
            todo_completed: false
        }

    }

    onChangeTodoDescription = (e) => {
        this.setState({
            todo_description: e.target.value
        });
    };

    onChangeTodoResponsible = (e) => {
        this.setState({
            todo_responsible: e.target.value
        });
    };

    onChangeTodoPriority = (e) => {
        this.setState({
            todo_priority: (e.target.value === '') ? 'Low' : e.target.value
        });
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        console.log(`New Todo Added`);
        console.log(`Descrition: ${this.state.todo_description}`);
        console.log(`Responsible: ${this.state.todo_responsible}`);
        console.log(`Priority: ${this.state.todo_priority}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: (this.state.todo_priority === '') ? 'Low' : this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:5000/todos/add', newTodo)
        .then(res => console.log(res.data));

        // Reset state
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        });
    };

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h4 style={{paddingBottom:"5px"}}>Create New Todo</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                placeholder="Description"
                                />
                    </div>
                    <div className="form-group">
                        <input 
                                type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                placeholder="Responsible"
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    defaultChecked
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}