import React, { Component } from 'react';
import { FormGroup , Label, Input, Button } from 'reactstrap';
import swal from 'sweetalert2';
import axios from 'axios';

class CommentField extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = {
            ID: '',
            UserID: '',
            PostID: '',
            Message: ''
        }; 
    }
    

    updateState = e => {
        const currUserId = sessionStorage.getItem("userID");
        const currPostId = sessionStorage.getItem("PostID");
        const currMessage = e.target.value;
        this.setState({ UserID: currUserId, PostID: currPostId, Message: currMessage });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { PostID, ID, UserID, Message  } = this.state;
        if (Message.length !== 0){
            axios.post('http://localhost:3000/comments', { ID, PostID, UserID, Message });
            swal('Success!',
                'Comment successfully posted!',
                'success');
        } else {
            swal('Error',
                'Cant post an empty comment!',
                'error');
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <FormGroup className="comment-field">
                    <Label for="Message">Write a comment:</Label>
                    <Input type="textarea" onKeyUp={this.updateState} name="Message" id="Message" />
                    <Button type="submit">Comment</Button>
                </FormGroup>
                </form>
            </div>
        );
    }
}

export default CommentField;
