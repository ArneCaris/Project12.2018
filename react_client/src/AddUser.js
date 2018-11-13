import React, { Component } from 'react';
import axios from 'axios';

class AddUser extends Component {
    constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        ID: '',
        username: '',
        password: ''
    };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();

        const { ID, username, password } = this.state;
        window.location.reload();

        axios
            .post('http://localhost:3000/Users', { ID, username, password })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };

    render() {
        return (
            <div className="content">
                <h2>Add User</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    ID:
                    <input type="number" name="ID" onChange={this.onChange} />
                    </label>
                    <label>
                    Username:
                    <input type="text" name="username" onChange={this.onChange} />
                    </label>
                    <label>
                    Password:
                    <input type="text" name="password" onChange={this.onChange} />
                    </label>
                    <button className="button" type="submit">
                    Add
                    </button>
                </form>
            </div>
        );
    }
}

export default AddUser;