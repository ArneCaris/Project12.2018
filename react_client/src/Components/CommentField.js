import React, { Component } from 'react';
import { FormGroup , Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import Moment from 'react-moment';


class CommentField extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.state = {
            comments: [],
            IDfield: '',
            IDlist: '',
            UserID: '',
            UserIDlist: '',
            PostID: '',
            Message: '',
            LastEdit: '',
            username: ''
        };
    }

    componentDidMount(){
        this.fetchComments();
    }

    fetchComments () {
        const currPostId = sessionStorage.getItem("PostID")

        axios.get(`http://localhost:3000/comments/`+currPostId).then(results => {
            const comments = results.data;
            const ID = [];
            const UserID = [];
            const PostID = [];
            const Message = [];
            const LastEdit = [];
            const username = [];
            for (var x = 0; x < comments.length; x++) {
                ID.push(comments[x].ID);
                UserID.push(comments[x].UserID);
                PostID.push(comments[x].PostID);
                Message.push(comments[x].Message);
                LastEdit.push(comments[x].LastEdit);
            }
            axios.get('http://localhost:3000/Users/').then(results => {
                const users = results.data;

                for ( var y = 0; y < users.length; y++){
                    username[users[y].ID] = users[y].username;
                }
            });
            this.setState({
                comments,
                ID,
                UserID,
                PostID,
                Message,
                LastEdit,
                username
            });
        });
    }

    shouldComponentUpdate() {
        if(this.state.PostID !== sessionStorage.getItem('PostID') || this.state.ID != this.prevProps){
            return true;
        } else {
            return false;
        }
    }

    updateState = e => {
        const currUserId = sessionStorage.getItem("userID");
        const currPostId = sessionStorage.getItem("PostID");
        const currMessage = document.getElementById('Message').value;

        this.setState({ UserID: currUserId, PostID: currPostId, Message: currMessage });
        console.log(this.state)

    }

    handleSubmit = e => {
        e.preventDefault();

        const { PostID, IDfield, UserID, Message  } = this.state;
        if (Message.length != 0 || UserID == null){
            axios.post('http://localhost:3000/comments', { IDfield, PostID, UserID, Message }).then( response =>
                this.fetchComments());
        } else {
            alert("Can't post an empty comment!");
        }
        console.log(this.state)
    };

    render() {
        let commentsList = this.state.comments.map ( (comment, index ) => {
            const commentUser = comment.UserID;
            const Messagestring = comment.Message;

            const counting = index + 1;

            const username =  this.state.username[commentUser];

            return (
                <div className="for-comments">
                    <div className="commentdiv">
                        <div className="commentDate">
                            <Moment format={"DD-MM-YYYY"}>
                                {comment.LastEdit}
                            </Moment>
                        </div>
                        <ul key={comment.ID} >
                            <i>#{counting}    <b>{username}</b></i>
                            <br/>
                            <p>{Messagestring}</p>
                        </ul>
                    </div>
                </div>)
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="Message">Write a comment:</Label>
                        <Input type="textarea" onKeyUp={this.updateState} name="Message" id="Message" />
                        <Button type="submit">Comment</Button>
                    </FormGroup>
                </form>
                <div>
                    {commentsList}
                </div>
            </div>

        );

    }
}

export default CommentField;