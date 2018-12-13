import React, { Component } from 'react';
import { FormGroup , Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import Moment from 'react-moment';
import swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';


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
            username: '',
            trashCan: ''
        };
    }

    componentDidMount(){
        this.fetchComments();
    }

    fetchComments () {
        const currPostId = sessionStorage.getItem("PostID");

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
                IDlist: ID,
                UserIDList: UserID,
                Message,
                LastEdit,
                username
            });
        });
    }

    shouldComponentUpdate() {
        if(this.state.PostID !== sessionStorage.getItem('PostID') || this.state.IDlist != this.prevState){
            return true;
        } else {
            return false;
        }
    }

    updateState = () => {
        const currUserId = sessionStorage.getItem("userID");
        const currPostId = sessionStorage.getItem("PostID");
        const currMessage = document.getElementById('Message').value;

        this.setState({ UserID: currUserId, PostID: currPostId, Message: currMessage });

    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { PostID, IDfield, UserID, Message  } = this.state;
        if (Message.length != 0 || UserID == null || Message != this.prevProps){
            axios.post('http://localhost:3000/comments', { IDfield, PostID, UserID, Message }).then( response =>
                this.fetchComments(response));
            const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            toast({
                type: 'success',
                title: 'Comment Posted!'
            });
        } else {
            swal('Waring',
                'You cannot post an empty comment!',
                'error');
        }
        
        document.getElementById('Message').focus();
        
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
                                <Moment format={"MMM DD, YYYY - HH:mm"}>
                                    {comment.LastEdit}
                                </Moment>
                            </div>
                            <ul key={comment.ID}>
                                <i>#{counting}</i> {username}
                                <br/>
                                <p>{Messagestring}</p>
                            </ul>
                        </div>
                </div>

                )
        });

        return (
            <div>
                {sessionStorage.length !== 1
                ?<form onSubmit={this.handleSubmit}>
                    <FormGroup style={{padding: '5px'}}>
                        <Label for="Message">Write a comment:</Label>
                            <Input type="textarea" onKeyUp={this.updateState} name="Message" id="Message" />
                        <Button type="submit">Comment</Button>
                    </FormGroup>
                </form>
                :
                <div className="auth-error">
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                    <h5>You are not authenticated</h5>
                    <p>You must be logged in to post a comment</p>
                </div>
                }
                <div>
                    {commentsList}
                </div>
            </div>

        );

    }
}

export default CommentField;