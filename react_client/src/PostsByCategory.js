import React, { Component } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentField from './Components/CommentField';
import 'moment-timezone';
import Moment from 'react-moment';
import UserMenu from "./Components/UserMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShareAlt, faEdit, faAt } from '@fortawesome/free-solid-svg-icons';

  class PostsByCategory extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        ID: '',
        UserID: '',
        Title: '',
        Content: '',
        Category: '',
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
      const item1 = "lifestyle"
      const item2 = "gaming"
      const item3 = "vehicles"
      const item4 = "technology"
      const url = window.location.href
      if (url.includes(item1)) {
        axios.get(`http://localhost:3000/Posts/category/` + item1).then(results => {
          const posts = results.data;
          const ID = [];
          const UserID = [];
          const Title = [];
          const Content = [];
          const Category = [];
          const LastEdit = [];
          for (var x = 0; x < posts.length; x++) {
            ID.push(posts[x].ID);
            UserID.push(posts[x].UserID)
            Title.push(posts[x].Title);
            Content.push(posts[x].Content);
            Category.push(posts[x].Category);
            LastEdit.push(posts[x].LastEdit)
          }
          this.setState({ 
            posts,
            ID,
            UserID,
            Title,
            Content,
            Category,
            LastEdit
          });
          });}
      if (url.includes(item2)) {
        axios.get(`http://localhost:3000/Posts/category/` + item2).then(results => {
          const posts = results.data;
          const ID = [];
          const UserID = [];
          const Title = [];
          const Content = [];
          const Category = [];
          const LastEdit = [];
          for (var x = 0; x < posts.length; x++) {
            ID.push(posts[x].ID);
            UserID.push(posts[x].UserID)
            Title.push(posts[x].Title);
            Content.push(posts[x].Content);
            Category.push(posts[x].Category);
            LastEdit.push(posts[x].LastEdit)
          }
          this.setState({ 
            posts,
            ID,
            UserID,
            Title,
            Content,
            Category,
            LastEdit
          });
          });}
      if (url.includes(item3)) {
        axios.get(`http://localhost:3000/Posts/category/` + item3).then(results => {
          const posts = results.data;
          const ID = [];
          const UserID = [];
          const Title = [];
          const Content = [];
          const Category = [];
          const LastEdit = [];
          for (var x = 0; x < posts.length; x++) {
            ID.push(posts[x].ID);
            UserID.push(posts[x].UserID)
            Title.push(posts[x].Title);
            Content.push(posts[x].Content);
            Category.push(posts[x].Category);
            LastEdit.push(posts[x].LastEdit)
          }
          this.setState({ 
            posts,
            ID,
            UserID,
            Title,
            Content,
            Category,
            LastEdit
          });
          });}
      if (url.includes(item4)) {
        axios.get(`http://localhost:3000/Posts/category/` + item4).then(results => {
          const posts = results.data;
          const ID = [];
          const UserID = [];
          const Title = [];
          const Content = [];
          const Category = [];
          const LastEdit = [];
          for (var x = 0; x < posts.length; x++) {
            ID.push(posts[x].ID);
            UserID.push(posts[x].UserID)
            Title.push(posts[x].Title);
            Content.push(posts[x].Content);
            Category.push(posts[x].Category);
            LastEdit.push(posts[x].LastEdit)
          }
          this.setState({ 
            posts,
            ID,
            UserID,
            Title,
            Content,
            Category,
            LastEdit
          });
          });}
    }
    
  
    forlooptitle (idlist, search) {
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
    const closeBtn = <button className="close" onClick={this.handleClose}>&times;</button>;

    let postsList = this.state.posts.map ( (Post, index) => {
      if (Post.Title.length > 40) {
        var titlestring = Post.Title.substring(0, 40) + "..."
      }
      else {
        titlestring = Post.Title
      }
      if (Post.Content.length > 40) {
        var contentstring = Post.Content.substring(0, 70) + "..."
      }
      else {
        contentstring = Post.Content
      }
      return (
        
        <div key={index} className="for-posts">
        <div className="postdiv">
          <ul onClick={() => this.handleModal(Post.ID)} id={Post.ID} >
              <Link to={"/posts/category/" + (Post.Category).toLowerCase()} style={{textDecoration: 'none', color: 'black', fontSize: '12px'}}>Category: <b>{Post.Category}</b></Link>
              <Moment format={"MMM DD, YYYY - HH:mm"} style={{float: 'right', fontSize: '12px'}}>
                  {Post.LastEdit}
              </Moment>
              <li>ID: <i>{Post.ID}</i></li>
            <li><h3>{titlestring}</h3></li>
            <li><p>{contentstring}</p></li>
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
          <br/>
          <div>
              <div><UserMenu/></div>
              <div>{postsList}</div>
          </div>
 
          
          <Modal isOpen={this.state.modal} className="modal-dialog modal-lg">

          <ModalHeader toggle={this.handleClose} close={closeBtn}>{modaltitle}</ModalHeader>
          <ModalBody>
            <div>
              {this.state.titlecontent}
            </div>
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
  

  export default PostsByCategory;