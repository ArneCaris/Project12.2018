import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationButton from './Components/NavigationButton';
import CommentField from './Components/CommentField';
import PostModal from './Components/PostModal';
import RemoveButton from './Components/RemoveButton';
import moment from 'react-moment';
import 'moment-timezone';
import Moment from 'react-moment';

class Test extends Component {

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

  forlooptitle (idlist, search) {
      console.log(search)
      console.log(idlist)
      var anotherarray = {};
      for (var x = 0; x < this.state.posts.length; x++) {
          if (idlist.includes(this.state.posts[x].ID)) {
            anotherarray[this.state.posts[x].ID]= {id: this.state.posts[x].ID, title: this.state.posts[x].Title, content: this.state.posts[x].Content}
            if (this.state.posts[x].ID == document.getElementById(search).id)  {
              this.setState({
                titletext: anotherarray[this.state.posts[x].ID].title,
                titlecontent: anotherarray[this.state.posts[x].ID].content
              });
              break
              
            }               
          }
          else {
            break
          }
          
      }  
  }

  handleModal = e => {
    const search = e.target.id;
    console.log(search)
    var idlist = []
    for (var x = 0; x < this.state.posts.length; x++) {

      idlist.push(this.state.posts[x].ID);

    this.setState({
      modal: !this.state.modal,
     });  
    this.forlooptitle(idlist, search);
    }
}

handleClose() {
  this.setState({
    modal: !this.state.modal,
});
}

render() {
  let postsList = this.state.posts.map ( Post => {
    return (
    <div className="for-posts">
    <div className="postdiv">
      <ul onClick={this.handleModal} id={Post.ID} className={Post.ID}>
        <li>ID: <i>{Post.ID}</i></li>
        <li><h3>{Post.Title}</h3></li>
        <li><p>{Post.Content}</p></li>
        <Badge>{Post.Category}</Badge>
        <Moment format={"DD-MM-YYYY"}>
          <li>{Post.LastEdit}</li>
        </Moment>
      </ul>
    </div>
    </div>)
  });
      var modaltitle =
        <div id="title">
          
          {this.state.titletext}
        
        </div>
        ;
      var modalcontent =
        <div>
          
          {this.state.titlecontent}
        
        </div>
        ;

    return(
      <div>
        <div>
          {postsList}
        </div>
        
        <Modal key={this.props.ID} isOpen={this.state.modal} key={this.state.posts.ID} className="modalpost">
          
            <ModalHeader>{modaltitle}</ModalHeader>
            <ModalBody>
              {modalcontent}
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

export default Test;