import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
    
        constructor() {
            super();
            this.onChange = this.onChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                id: '',
                userid: '',
                title: '',
                content: '',
                whenposted: '',
                isprivate: ''
            }; 
        }
        onChange = e => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);
        };
        handleSubmit = event => {
            event.preventDefault();
    
            const { ID, UserID, Title, Content, WhenPosted, isPrivate  } = this.state;
            window.location.reload();
    
            axios
                .post('http://localhost:3000/posts', { ID, UserID, Title, Content, WhenPosted, isPrivate  })
                .then(res => {
                console.log(res);
                console.log(res.data);
                });
            };
        render() {
        return (
            <div>
                <h2>Create Post</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    ID:
                    <input type="number" name="ID" onChange={this.onChange} />
                    </label>
                    <label>
                    UserID:
                    <input type="number" name="UserID" onChange={this.onChange} />
                    </label>
                    <label>
                    Title:
                    <input type="text" name="Title" onChange={this.onChange} />
                    </label>
                    <label>
                    Content:
                    <input type="text" name="Content" onChange={this.onChange} />
                    </label>
                    <label>
                    WhenPosted:
                    <input type="text" name="WhenPosted" onChange={this.onChange} />
                    </label>
                    <label>
                    isPrivate:
                    <input type="text" name="isPrivate" onChange={this.onChange} />
                    </label>
                    <button className="button" type="submit">
                    Add
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePost;