import React, { Component } from 'react';
import axios from 'axios';

class DeleteUser extends Component {
    constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
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
        console.log(sessionStorage.getItem("userID"));
    };

    handleSubmit = event => {
        event.preventDefault();
        const id = sessionStorage.getItem("userID");
        const { ID, username, password } = this.state;
        axios
            .delete('http://localhost:3000/Users/' + id, { ID, username, password })
            .then(res => {
            console.log(res.data);
        });
        sessionStorage.clear();
        this.props.history.push('/');
    };
    
    handleBack() {
        this.props.history.goBack();
    }


    render() {
        return (
            <div className="content">
                <h2>Close Account</h2>

                    <button className="button" onClick={this.handleSubmit}>Delete</button>
                    <button className="button" onClick={this.handleBack}>Cancel</button>

            </div>
        );
    }
}

export default DeleteUser;