import React, { Component } from 'react';
import axios from 'axios';

class DeleteUser extends Component {
    constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        ID: '',
        username: '',
        password: '',
    };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const id = this.state.ID;
        const { ID, username, password } = this.state;
        window.location.reload();

        axios
            .delete('http://localhost:3000/Users/' + id, { ID, username, password })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };

    render() {
        return (
            <div className="content">
                <h2>Delete User</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    ID:
                    <input type="number" name="ID" onChange={this.onChange} />
                    </label>
                    <button className="button" type="submit">
                    Delete
                    </button>
                </form>
            </div>
        );
    }
}

export default DeleteUser;