import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap'; 

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
            .delete('http://localhost:3000/Users/' + id, { ID, username, password });
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
                <h5>This will permanently delete your user!</h5>
                    <Button color="danger" onClick={this.handleSubmit}>Confirm</Button>
                    <Button color="info" onClick={this.handleBack}>Cancel</Button>

            </div>
        );
    }
}

export default DeleteUser;