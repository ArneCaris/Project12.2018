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
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/posts/public`).then(results => {
      const posts = results.data;
      const ID = results.data;
      const Title = results.data;
      const Content = results.data;
      const LastEdit = results.data;
      this.setState({ 
        posts,
        ID,
        Title,
        Content,
        LastEdit,
       });
    });
  }

    handleRemove = ID => {
    this.setState ({
      posts: this.state.posts.filter( Post => Post.ID !== ID)
    });
  };

  handleModal() {
    this.setState({
        modal: !this.state.modal,
        ID: this.state.ID,
        Title: this.state.Title,

    });
}


render() {
    let postsList = this.state.posts.map ((Post, i) => {
        return (
        <div className="for-posts" data-id={Post.ID}>
        <div className="postdiv">
          <ul>
            <li onClick={this.handleModal} key={i}>{Post.Title}</li>
            <li key={i}>{Post.Content}</li>
          </ul>
        </div>
        </div>)
      });
    return(
      <div>
        <div>
          {postsList}
        </div>
        <Modal key={this.props.ID} isOpen={this.state.modal} toggle={this.handleModal} key={this.state.posts.ID} className="modalpost">
            <ModalHeader>{this.props.Title}</ModalHeader>
            <ModalBody>{this.props.Content}</ModalBody>
            
              <CommentField/>
            
          </Modal>
      </div>
    );
}
}

export default Test;