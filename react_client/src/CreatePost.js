import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
    
        constructor() {
            super();
            this.onChange = this.onChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                ID: '',
                UserID: '',
                Title: '',
                Content: '',
                Category: '',
                WhenPosted: '',
                LastEdit: '',
                isPrivate: ''
            }; 
        }
        onChange = e => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);
        };
        handleSubmit = event => {
            event.preventDefault();
    
            const { ID, UserID, Title, Content, WhenPosted, Category, isPrivate, LastEdit  } = this.state;

            axios
                .post('http://localhost:3000/posts', { ID, UserID, Title, Content, Category, WhenPosted, isPrivate, LastEdit })
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
                        UserID:
                        <input type="number" name="UserID" onChange={this.onChange} required/>
                    </label>
                    <br/>
                    <label>
                        Title:
                        <input type="text" name="Title" onChange={this.onChange} required/>
                    </label>
                    <br/>
                    <label>
                        Content:
                        <input type="text" name="Content" onChange={this.onChange} required/>
                    </label>
                    <br/>
                    <label>
                        Category:
                        <input type="text" name="Category" onChange={this.onChange} />
                    </label>
                    <br/>
                    <label>
                        LastEdited:
                        <input type="text" name="LastEdit" onChange={this.onChange} />
                    </label>
                    <br/>
                    <button className="button-create" type="">
                        Create Post
                    </button>
                    <button className="button-submit" type="submit">
                        Publish Post
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePost;