import React, { Component } from 'react';
import axios from 'axios';

class EditPost extends Component {

    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {
            ID: '',
            UserID: '',
            Title: '',
            Content: '',
            Category: '',
            isPrivate: '',
        }
    }
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    updateInputValue(val) {
        this.setState({ ID: val.target.value });
      }

    handleSubmit = event => {
        event.preventDefault();
        const { ID, UserID, Title, Content, Category, isPrivate } = this.state;
        axios
        .put('http://localhost:3000/posts/' + ID , { UserID, Title, Content, Category, isPrivate })
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
};

    render() {
        return (
            <div className="update-container">
                <div>
                <input type="number" name="ID" onChange={this.updateInputValue} value={this.state.uid} min="1" />
                    <form onSubmit={this.handleSubmit}>
                    <br/>
                    <label>
                        User id:
                        <input type="number" name="UserID" onChange={this.onChange}/>
                    </label>
                    <br/>
                    <label>
                        Title:
                        <input type="text" name="Title" onChange={this.onChange}/>
                    </label>
                    <br/>
                    <label>
                        Content:
                        <input type="text" name="Content" onChange={this.onChange}/>
                    </label>
                    <br/>
                    <label>
                        Category:
                        <input type="text" name="Category" onChange={this.onChange} />
                    </label>
                    <br/>
                    <label>
                        Is Private?:
                        <input type="number" name="isPrivate" onChange={this.onChange} />
                    </label>
                    <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditPost;