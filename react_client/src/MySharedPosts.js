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

class MySharedgeneralPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generalPost: [],
      ID: '',
      PostID: '',
      Owner: '',
      Viewer: '',
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
    var ideShared = sessionStorage.getItem('userUsername', JSON.stringify(ideShared));
    ideShared = ideShared.replace(/['"]+/g, '')
    axios.get(`http://localhost:3000/Shared/mine/` + ideShared).then(results => {
        const generalPost = results.data;
        const ID = [];
        const PostID = [];
        const Owner = [];
        const Viewer = [];
        const Title = [];
        for (var x = 0; x < generalPost.length; x++) {
            ID.push(generalPost[x].ID);
            PostID.push(generalPost[x].PostID);
            Owner.push(generalPost[x].Owner);
            Viewer.push(generalPost[x].Viewer)
        }
        var idePost = sessionStorage.getItem('userID', JSON.stringify(idePost));
        ideShared = ideShared.replace(/['"]+/g, '')
        axios.get('http://localhost:3000/Posts/user/' + idePost).then(results => {
            const modalPost = results.data;

            for ( var y = 0; y < modalPost.length; y++){
                Title[modalPost[y].ID] = modalPost[y].Title;
            }
        });
        this.setState({ 
            generalPost,
            ID,
            PostID,
            Owner,
            Viewer,
            Title
        });
      });
    
  }

  forlooptitle (idlist, search) {
      var anotherarray = {};
      for (var x = 0; x < this.state.generalPost.length; x++) {
          if (idlist.includes(this.state.generalPost[x].ID)) {
            anotherarray[this.state.generalPost[x].ID]= {id: this.state.generalPost[x].ID, title: this.state.generalPost[x].Owner, content: this.state.generalPost[x].Viewer}


            if (this.state.generalPost[x].ID == document.getElementById(search).id)  {
              var requestedTitle = anotherarray[this.state.generalPost[x].ID].title;
              var requestedContent = anotherarray[this.state.generalPost[x].ID].content;
              this.setState({
                titletext: requestedTitle,
                titlecontent: requestedContent
              });
              if (anotherarray[this.state.generalPost[x].ID].title.length > 20) {
                console.log(anotherarray[this.state.generalPost[x].ID].title.length)
                
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
    for (var x = 0; x < this.state.generalPost.length; x++) {

      idlist.push(this.state.generalPost[x].ID);

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
  let postsList = this.state.generalPost.map ( Post => {
    const postidentification = Post.PostID
    console.log(postidentification)
    const title = this.state.Title[postidentification];
    console.log(title)
    if (Post.Viewer.length > 40) {
      var contentstring = Post.Viewer.substring(0, 40) + "..."
    }
    else {
      contentstring = "Shared with: " + Post.Viewer
    }
    return (
    <div key={Post.PostID} className="for-generalPost">
    <div className="postdiv">
      <ul onClick={() => this.handleModal(Post.ID)} id={Post.ID} >
        <li>ID: <i>{Post.ID}</i></li>
        <li><h3>{title}</h3></li>
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
        
        <Modal isOpen={this.state.modal} key={this.state.generalPost.ID} className="modal-dialog modal-lg">
          
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

export default MySharedgeneralPost;