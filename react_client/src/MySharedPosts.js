import React, { Component } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";
import CommentField from './Components/CommentField';
import 'moment-timezone';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class MySharedPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      ID: '',
      Title: '',
      Content: '',
      LastEdit: '',
      titletext: '',
      titlecontent: '',
      modal: false
    };
    this.handleModal = this.handleModal.bind(this);
    this.forlooptitle = this.forlooptitle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/Shared/mine/arne`).then(results => {
      const posts = results.data;
      const ID = [];
      const PostID = [];
      const Owner = [];
      const Viewer = [];
      for (var x = 0; x < posts.length; x++) {
        ID.push(posts[x].ID);
        PostID.push(posts[x].PostID);
        Owner.push(posts[x].Owner);
        Viewer.push(posts[x].Viewer)
      }
      this.setState({ 
        posts,
        ID,
        PostID,
        Owner,
        Viewer
       });
    });
  }

  forlooptitle (idlist, search) {
      var anotherarray = {};
      for (var x = 0; x < this.state.posts.length; x++) {
          if (idlist.includes(this.state.posts[x].ID)) {
            anotherarray[this.state.posts[x].ID]= {id: this.state.posts[x].ID, title: this.state.posts[x].Owner, content: this.state.posts[x].Viewer}


            if (this.state.posts[x].ID == document.getElementById(search).id)  {
              var requestedTitle = anotherarray[this.state.posts[x].ID].title;
              var requestedContent = anotherarray[this.state.posts[x].ID].content;
              this.setState({
                titletext: requestedTitle,
                titlecontent: requestedContent
              });
              if (anotherarray[this.state.posts[x].ID].title.length > 20) {
                console.log(anotherarray[this.state.posts[x].ID].title.length)
                
              }
              break
              
            }               
          }
          else {
            break
          }
          
      }  
  }

  handleModal (search) {
    var idlist = []
    for (var x = 0; x < this.state.posts.length; x++) {

      idlist.push(this.state.posts[x].ID);

      this.setState({
        modal: !this.state.modal,
      });  
    }

    this.forlooptitle(idlist, search);
}

handleClose() {
  this.setState({
    modal: !this.state.modal,
});
}

render() {
  let postsList = this.state.posts.map ( Post => {
    if (Post.Owner.length > 40) {
      var titlestring = Post.Owner.substring(0, 40) + "..."
    }
    else {
      titlestring = Post.Owner
    }
    if (Post.Viewer.length > 40) {
      var contentstring = Post.Viewer.substring(0, 40) + "..."
    }
    else {
      contentstring = Post.Viewer
    }
    return (
    <div key={Post.PostID} className="for-posts">
    <div className="postdiv">
      <ul onClick={() => this.handleModal(Post.ID)} id={Post.ID} >
        <li>ID: <i>{Post.ID}</i></li>
        <li><h3>{titlestring}</h3></li>
        <li><p>{contentstring}</p></li>
      </ul>
    </div>
    </div>)
  });
      var modaltitle =
        <div id="title">
          
          {this.state.titletext.substring(0, 50)}
          <br/>
          {this.state.titletext.substring(50, 100)}
        </div>
        ;

    return(
      <div>
        <div>
          {postsList}
        </div>
        
        <Modal isOpen={this.state.modal} key={this.state.posts.ID} className="modal-dialog modal-lg">
          
            <ModalHeader>{modaltitle}</ModalHeader>
            <ModalBody>
              {this.state.titlecontent.length > 40
              ?
              <div>
                {this.state.titlecontent.substring(0, this.state.titlecontent.length * 0.25 )}
                <br/>
                {this.state.titlecontent.substring(this.state.titlecontent.length * 0.25, this.state.titlecontent.length * 0.50)}
                <br/>
                {this.state.titlecontent.substring(this.state.titlecontent.length * 0.50, this.state.titlecontent.length * 0.75)}
                <br/>
                {this.state.titlecontent.substring(this.state.titlecontent.length * 0.75, this.state.titlecontent.length)}
              </div>
              :
              <div>
                {this.state.titlecontent}
              </div>
              }
            </ModalBody>
            
              <CommentField/>
            <ModalFooter>
              <Button color="secondary" onClick={this.handleClose}>Close</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
}
}

export default MySharedPosts;