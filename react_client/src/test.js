import React, { Component } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label} from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";
import CommentField from './Components/CommentField';
import 'moment-timezone';
import Moment from 'react-moment';
import { Link, Route, Switch } from 'react-router-dom';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShareAlt, faEdit, faAt } from '@fortawesome/free-solid-svg-icons';
import UserMenu from "./Components/UserMenu";
import './CreatePost.css';

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      Users: [],
      sharedWith: [],
      ID: '',
      Title: '',
      Content: '',
      LastEdit: '',
        isPrivate: '',
      titletext: '',
      titlecontent: '',
      PostID: '',
      Owner: '',
      Viewer: '',

      sharedID: '',
      sharedViewer: '',
      sharedPostID: '',
      modal: false,
        modal2: false
    };

        this.handleModal = this.handleModal.bind(this);
        this.handleModal2 = this.handleModal2.bind(this);
        this.forlooptitle = this.forlooptitle.bind(this);
        this.handleClose = this.handleClose.bind(this);
      this.handleClose2 = this.handleClose2.bind(this);

      this.shareEntry = this.shareEntry.bind(this);
        this.Owner = this.Owner.bind(this);
        this.handleShare = this.handleShare.bind(this);


      this.updateInputValue = this.updateInputValue.bind(this);
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

        this.showShared = this.showShared.bind(this);
        this.getshared = this.getshared.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getshared();
    axios.get(`http://localhost:3000/posts/public`).then(results => {
      const posts = results.data;
      const ID = [];
      const UserID = [];
      const Title = [];
      const Content = [];
      for (var x = 0; x < posts.length; x++) {
        ID.push(posts[x].ID);
        UserID.push(posts[x].UserID)
        Title.push(posts[x].Title);
        Content.push(posts[x].Content);
      }
      this.setState({ 
        posts,
        ID,
        UserID,
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
  getshared() {
    var ideShared = JSON.parse(sessionStorage.getItem("userUsername"));
    axios.get(`http://localhost:3000/Shared/mine/` + ideShared).then(results => {
      const sharedWith = results.data;

      this.setState({ sharedWith: sharedWith});
       
    });
  }

  showShared (sharedpostid) {
    var something = ''


      for ( var x = 0; x < this.state.sharedWith.length; x++) {
        if (this.state.sharedWith[x].PostID == sharedpostid) {
          something += this.state.sharedWith[x].Viewer;
          something += '\n'
          something = something.replace('undefined', '');
        }
 
    }
    
    
    swal({
      title: 'You shared this post with:',
      text: something,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
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

    var Check = this.state.Users.map(user => (user.username));
    console.log(Check);
    for( var x = 0; x < Check.length; x++){
      if( Check[x] != this.state.Owner && Check[x] == Viewer ){
        axios
          .post('http://localhost:3000/Shared/', { PostID, Owner, Viewer })
          .then(res => {
            console.log(res.statusText)
            if (res.statusText == 'OK'){
              swal ('Success',
                'Entry has been shared with '+ Viewer,
              'success')
            } else {
              swal ('Error,',
              'Entry was not shared.',
              'error')
            }
          });
     } else {
       swal ('Error!',
            'User with a username "<b>'+Viewer+'</b>" does not exist!',
            'error')
     }
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

    handleModal2(search) {
	    let idlist = [];
	    sessionStorage.setItem('PostNUM', JSON.stringify(search));
	    for (let x = 0; x < this.state.posts.length; x++){
	        idlist.push(this.state.posts[x].ID);
	        this.setState({
                modal2: !this.state.modal2
            });
        }
        this.forlooptitle(idlist, search)
    }

  handleClose() {
    sessionStorage.removeItem( 'PostID' );

    this.setState({
      modal: !this.state.modal,
  });
  };
    handleClose2() {
        sessionStorage.removeItem( 'PostNUM' );

        this.setState({
            modal2: !this.state.modal2,
        });
    };

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    updateInputValue() {
        this.setState({ ID: sessionStorage.PostID});
    };

    handleSubmit = event => {
        event.preventDefault();
        const currUserID = JSON.parse(sessionStorage.getItem('userID'));
        this.setState({UserID: currUserID});
        const { Title, Content, Category, isPrivate } = this.state;
        const ID = document.getElementById('editID').value;

        if(this.state.Category && this.state.isPrivate) {

          axios
          .put('http://localhost:3000/posts/' + ID , {  Title, Content, Category, isPrivate })
          .then(res => {

            window.location.reload();
            
            
          });
        } else {
          swal ( 'Oopsie!',
                'you better fill in all the fields kid!',
                'error')
        }
    };

render() {
      const closeBtn = <button className="close" onClick={this.handleClose}>&times;</button>;
    const closeBtn2 = <button className="close" onClick={this.handleClose2}>&times;</button>;

    let postsList = this.state.posts.map ( (Post, index ) => {
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
    const userID = JSON.parse(sessionStorage.getItem('userID'));
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

        { Post.UserID == userID ?
            <div id="options">
                <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'left', border:'1px solid black', borderRadius: '4px'}} icon={faAt} onClick={() => this.showShared(Post.ID)} />
                <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'right', border:'1px solid black', borderRadius: '4px'}} icon={faTrashAlt} onClick={() => this.confirmDeletion(Post.ID)} />
                <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'right', border:'1px solid black', borderRadius: '4px', marginRight: '2px'}} icon={faShareAlt} onClick={() => this.shareEntry(Post.ID)} />
                <FontAwesomeIcon id={Post.ID} style={{fontSize: '30px', padding: '5px', float: 'right', border:'1px solid black', borderRadius: '4px', marginRight: '2px', color:'black'}} icon={faEdit} onClick={() => this.handleModal2(Post.ID)}/>
            </div>
            :
            <p></p>
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

          <Modal isOpen={this.state.modal2} className="modal-dialog modal-lg">
              <ModalHeader toggle={this.handleClose2} close={closeBtn2}>
                  Updating: <b>{modaltitle}</b>
                  {this.state.titlecontent}

              </ModalHeader>
              <ModalBody>
                  <Form onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>
                      <input type="number" id="editID" onChange={this.updateInputValue} value={sessionStorage.PostNUM} min="1" disabled />
                      <FormGroup>
                          <Label for="title">Title</Label>
                          <Input type="title" name="Title" maxLength="50" className="form-input" onChange={this.onChange}/>
                      </FormGroup>
                      <FormGroup>
                          <Label for="content">Content</Label>
                          <Input type="textarea" name="Content" placeholder={this.state.titlecontent} className="form-input" onChange={this.onChange}/>
                      </FormGroup>
                      <FormGroup>
                          <label required>Category <br/> <br/>
                              <label className="ChackboxContainer">Gaming
                                  <input onChange={this.onChange} type="radio" value="Gaming" name="Category"/>
                                  <span className="checkmark"></span>
                              </label>
                              <label className="ChackboxContainer">Lifestyle
                                  <input onChange={this.onChange} type="radio" value="Lifestyle" name="Category"/>
                                  <span className="checkmark"></span>
                              </label>
                              <label className="ChackboxContainer">Vehicles
                                  <input onChange={this.onChange} type="radio" value="Vehicles" name="Category"/>
                                  <span className="checkmark"></span>
                              </label>
                              <label className="ChackboxContainer">Technology
                                  <input onChange={this.onChange} type="radio" value="Technology" name="Category"/>
                                  <span className="checkmark"></span>
                              </label>
                          </label>
                      </FormGroup>
                      <FormGroup>
                          <label>Do you want this post to be Private?</label>
                          <br/>
                          <label className="ChackboxContainer">No
                              <input onChange={this.onChange} type="radio" value="0" name="isPrivate" />
                              <span className="checkmark"></span>
                          </label>

                          <label className="ChackboxContainer">Yes
                              <input onChange={this.onChange} type="radio" value="1" name="isPrivate"/>
                              <span className="checkmark"></span>
                          </label>
                      </FormGroup>
                      <button type="submit">Update</button>
                  </Form>
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
          </Modal>
      </div>
    );
}
}

export default Test;