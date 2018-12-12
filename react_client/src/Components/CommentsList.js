import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';


class CommentsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            ID: '',
            UserID: '',
            PostID: '',
            Message: '',
            LastEdit: '',
            username: ''
        }; 
    }

    componentDidMount(){
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
        return this.state.PostID !== sessionStorage.getItem('PostID');
    }

    render() {
        
        let commentsList = this.state.comments.reverse().map ( (comment, index ) => {
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
                {commentsList}
            </div>
        );
    }
}
        
export default CommentsList;