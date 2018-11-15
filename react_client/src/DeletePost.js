import React, { Component } from 'react';
import axios from 'axios';

class DeletePost extends Component {

        constructor() {
            super();
            this.onChange = this.onChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                ID: ''
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
                const { ID } = this.state;
                
        
                axios
                    .delete('http://localhost:3000/posts/' + id, { ID })
                    .then(res => {
                    console.log(res);
                    console.log(res.data);
                    });
            };
        render() {
        return (
            <div>
            <h2>Delete Post</h2>
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

export default DeletePost;