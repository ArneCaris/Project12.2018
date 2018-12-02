import React, { Component } from 'react';
import { FormGroup , Label, Input, Button } from 'reactstrap';
import axios from 'axios';
class CommentField extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        const { ID, UserID, Message,LastEdit  } = this.state;
        const PostID = document.getElementById("postid").value

        axios
            .post('http://localhost:3000/comments', { ID, PostID, UserID, Message, LastEdit })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input type="textarea" name="Message" id="exampleText" />
                    <Button type="submit">Comment</Button>
                </FormGroup>
                </form>
            </div>
        );
    }
}

export default CommentField;
