import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wholepost from './Components/Wholepost';
import NavigationButton from './Components/NavigationButton';
import CommentField from './Components/CommentField';
import PostModal from './Components/PostModal';
import RemoveButton from './Components/RemoveButton';

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      ID: '',
      Title: '',
      Content: '',
      LastEdit: '',
      modal: false
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.forloopfunction = this.forloopfunction.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/posts/public`).then(results => {
      const posts = results.data;
      const ID = [];
      const Title = [];
      const Content = [];
      const LastEdit = [];
      for (var x = 0; x < posts.length; x++) {
        ID.push(posts[x].ID);
        Title.push(posts[x].Title);
        Content.push(posts[x].Content);
        LastEdit.push(posts[x].LastEdit)
      }
      this.setState({ 
        posts,
        ID,
        Title,
        Content,
        LastEdit
       });
    });
  }

  forloopfunction () {
    for (var x = 0; x < this.state.posts.length; x++) {
      if (this.state.posts[x].ID == document.getElementById("forloop").className) {

        //  document.getElementById("title").value = this.state.Title[x];
          console.log(this.state.Title[x]);
      }
      else {
        console.log(this.state.posts[x].ID)
        console.log(document.getElementById("forloop").className);
      }

    }
  }

    handleRemove = ID => {
    this.setState ({
      posts: this.state.posts.filter( Post => Post.ID != ID)
    });
  };

  handleModal() {

    this.setState({
        modal: !this.state.modal,

    });
    this.forloopfunction();
}


render() {
    let postsList = this.state.posts.map ( Post => {
        return (
        <div className="for-posts" id={Post.ID}>
        <div className="postdiv">
          <ul>
            <li onClick={this.handleModal} id="forloop" className={Post.ID}>{Post.Title}</li>
            <li>{Post.Content}</li>
          </ul>
        </div>
        </div>)
      });
      var modaltitle =
        <div id="title">
          
        
        </div>
        ;
      var modalcontent =
        <div>
          
          {this.state.Content[3]}
        
        </div>
        ;

    return(
      <div>
        <div>
          {postsList}
        </div>
        <Modal key={this.props.ID} isOpen={this.state.modal} toggle={this.handleModal} key={this.state.posts.ID} className="modalpost">
          
            <ModalHeader>{modaltitle}</ModalHeader>
            <ModalBody>
              {modalcontent}
            </ModalBody>
            
              <CommentField/>
            
          </Modal>
      </div>
    );
}
}

export default Test;