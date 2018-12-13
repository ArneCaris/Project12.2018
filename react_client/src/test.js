import React, { Component } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";
import CommentField from './Components/CommentField';
import 'moment-timezone';
import Moment from 'react-moment';
import { Link, Route } from 'react-router-dom';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShareAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import UserMenu from "./Components/UserMenu";
import EditPost from "./EditPost";

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      Users: [],
      ID: '',
      Title: '',
      Content: '',
      LastEdit: '',
      titletext: '',
      titlecontent: '',
      PostID: '',
      Owner: '',
      Viewer: '',
      modal: false
    };

        this.handleModal = this.handleModal.bind(this);
        this.forlooptitle = this.forlooptitle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.shareEntry = this.shareEntry.bind(this);
        this.Owner = this.Owner.bind(this);
        this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    axios.get(`http://localhost:3000/posts/public`).then(results => {
      const posts = results.data;
      const ID = [];
      const Title = [];
      const Content = [];
      for (var x = 0; x < posts.length; x++) {
        ID.push(posts[x].ID);
        Title.push(posts[x].Title);
        Content.push(posts[x].Content);
      }
      this.setState({ 
        posts,
        ID,
        Title,
        Content,
       });
    });
  }

  deletePost = (ID) => {
    axios.delete(`http://localhost:3000/posts/${ID}`)
        .then(data => {
          if(data.status) {
            const post = [...this.state.posts];
            let results = post.filter( post => (
                post.ID !== ID
            ));
            this.setState({
              posts: results
            });
          }
        })
  };

  confirmDeletion (ID) {
    swal({
      title: 'Are you sure?',
      text: "This will permanently delete the post",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.deletePost(ID);
        swal(
            'Deleted!',
            'Post has been deleted!',
            'success'
        )
      }
    })
  };

	shareEntry (currPostID) {
    this.setState({PostID: currPostID});
    swal({
      title: 'Type in Persons Username',
      input: 'text',
      showCancelButton: true,
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
        return !value && 'You need to write something!'
      }
    }).then((inputValue) => {
     
      if (inputValue) {
        this.setState({Viewer: inputValue.value})
        console.log(this.state.Viewer);
        this.handleShare(currPostID, inputValue.value);
      }
    });
  }


  getUsers() {
      axios.get(`http://localhost:3000/Users/`).then(res => {
        const Users = res.data;
        this.setState({ Users });
      });
      
    } 

  Owner() {
      const state = this.state;
      state["Owner"] = JSON.parse(sessionStorage.getItem("userUsername"));
      this.setState(state);
  }

  handleShare (currPostID, currViewer) {
    this.Owner();
    this.setState({PostID: currPostID, Viewer: currViewer})
    const { PostID, Owner, Viewer } = this.state;
    console.log({ PostID, Owner, Viewer });

    var Check = this.state.Users.map(user => (user.username));
    console.log(Check);
    if( Check != this.state.Owner ){
      axios
        .post('http://localhost:3000/Shared/', { PostID, Owner, Viewer })
        .then(res => {
          if (res.status === 200){
            swal ('Success',
              'Entry has been shared with '+ Viewer,
            'success')
          } else {
            swal ('Error,',
            'Entry was not shared.',
            'error')
          }
        });
   } 
  }


  forlooptitle (idlist, search) {
      var anotherarray = {};
      for (var x = 0; x < this.state.posts.length; x++) {
          if (idlist.includes(this.state.posts[x].ID)) {
            anotherarray[this.state.posts[x].ID]= {id: this.state.posts[x].ID, title: this.state.posts[x].Title, content: this.state.posts[x].Content}


            if (this.state.posts[x].ID == document.getElementById(search).id)  {
              var requestedTitle = anotherarray[this.state.posts[x].ID].title;
              var requestedContent = anotherarray[this.state.posts[x].ID].content;
              this.setState({
                titletext: requestedTitle,
                titlecontent: requestedContent
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
    var idlist = [];
    sessionStorage.setItem( 'PostID', JSON.stringify(search) );

    for (var x = 0; x < this.state.posts.length; x++) {

      idlist.push(this.state.posts[x].ID);

      this.setState({
        modal: !this.state.modal,
      });  
    }
    this.forlooptitle(idlist, search);
}

handleClose() {
  sessionStorage.removeItem( 'PostID' );

  this.setState({
    modal: !this.state.modal,
});
}

render() {
      const closeBtn = <button className="close" onClick={this.handleClose}>&times;</button>;
  let postsList = this.state.posts.slice(1).reverse().map ( (Post, index ) => {
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
        {sessionStorage.length !== 0
            ?
            <div>
                <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'right', border:'1px solid black', borderRadius: '4px'}} icon={faTrashAlt} onClick={() => this.confirmDeletion(Post.ID)} />
                <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'right', border:'1px solid black', borderRadius: '4px', marginRight: '2px'}} icon={faShareAlt} onClick={() => this.shareEntry(Post.ID)} />
                <Link to="/EditPost/" render={(props) => <EditPost posts={this.state.posts} {...props}/>}>
                    <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'right', border:'1px solid black', borderRadius: '4px', marginRight: '2px', color:'black'}} icon={faEdit}/>
                </Link>
            </div>
                :
            <div>
                <p></p>
            </div>
        }
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
            <div className="col align-self-auto">
            <UserMenu/>
            </div>
            <div className="col align-self-start">
            {postsList}
            </div>
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

export default Test;