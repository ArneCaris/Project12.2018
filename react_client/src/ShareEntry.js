import React, { Component } from 'react';
import axios from 'axios';
import {getUsers} from './Users';


class ShareEntry extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.state = {
            ID: '',
            PostID: '',
            Owner: '',
            Viewer: ''
        };
        }
    
        onChange = e => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);
        };
    
    handleSubmit = event => {
        event.preventDefault();

        const { PostID, Owner, Viewer } = this.state;
        window.location.reload();

        axios
            .post('http://localhost:3000/Shared/', { PostID, Owner, Viewer })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} onKeyUp={this.Users}>
                    <label>FOR TEST PURPOSES POST ID:
                    <input type="number" name="PostID" placeholder="PostID" onChange={this.onChange}></input>
                    </label>
                    <br/>
                    <label>Share my(<input name="Owner" value="olek" onChange={this.onChange}></input>) entry with:
                    <input onKeyUp={this.getUsers} type="text" name="Viewer" placeholder="type in username" onChange={this.onChange} id="username"></input>
                    </label> 
                 <p id="user_test"></p>
                    <button type="submit">Share</button>
                </form>
            </div>
           

            
        );
    }
}

export default ShareEntry;