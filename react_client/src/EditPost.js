import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './CreatePost.css';

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

                <input type="number" name="ID" onChange={this.updateInputValue} value={this.state.uid} min="1" disabled/>
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="title" name="Title" maxLength="50" className="form-input" onChange={this.onChange}/>
                    </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input type="textarea" name="Content" className="form-input" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label required>Category <br/> <br/>
                                <label className="ChackboxContainer">Gaming
                                    <input onChange={this.onChange} type="radio" value="Gaming" name="Category"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="ChackboxContainer">Lifestyle
                                    <input onChange={this.onChange} type="radio" value="Lifestyle" name="Category"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="ChackboxContainer">Vehicles
                                    <input onChange={this.onChange} type="radio" value="Vehicles" name="Category"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="ChackboxContainer">Technology
                                    <input onChange={this.onChange} type="radio" value="Technology" name="Category"/>
                                    <span className="checkmark"></span>
                                </label>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>Do you want this post to be Private?</label>
                            <br/>

                            <label className="ChackboxContainer">No
                                <input onChange={this.onChange} type="radio" value="0" name="isPrivate" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="ChackboxContainer">Yes
                                <input onChange={this.onChange} type="radio" value="1" name="isPrivate"/>
                                <span className="checkmark"></span>
                            </label>
                        </FormGroup>
                    <button type="submit">Update</button>
                    </Form>
            </div>
        );
    }
}

export default EditPost;