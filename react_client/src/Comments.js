import React, { Component } from 'react';
  import axios from 'axios';
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

  class Comments extends Component {
    constructor() {
      super();
      this.getComments = this.getComments.bind(this);
      this.toggle1 = this.toggle1.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
      this.onChange = this.onChange.bind(this);
      this.handleSubmit1 = this.handleSubmit1.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
      this.handleSubmit3 = this.handleSubmit3.bind(this);
      this.state = {
        CommentData: [],
        modal1: false,
        modal2: false,
        modal3: false,
        ID: '',
        PostID: '',
        UserID: '',
        Message: '',
        LastEdit: '',
      };
    }
    getComments() {
      const ide = document.getElementById("postid").value
      axios.get(`http://localhost:3000/comments/` + ide).then(res => {
        const CommentData = res.data;
        this.setState({ CommentData });
      });
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit1 = event => {
        event.preventDefault();

        const { ID, UserID, Message,LastEdit  } = this.state;
        const PostID = document.getElementById("postid").value

        axios
            .post('http://localhost:3000/comments', { ID, PostID, UserID, Message, LastEdit })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
    };
    handleSubmit2 = event => {
        event.preventDefault();

        const id = this.state.ID
        const { ID, PostID, UserID, Message, LastEdit } = this.state;
        axios
            .delete('http://localhost:3000/comments/delete/' + id, { ID, PostID, UserID, Message, LastEdit })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
    }
    handleSubmit3 = event => {
        event.preventDefault();

        const id = this.state.ID
        const { ID, PostID, UserID, Message, LastEdit } = this.state;
        axios
            .put('http://localhost:3000/comments/edit/' + id, { ID, PostID, UserID, Message, LastEdit })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
    }
    
    toggle1() {
        this.setState({
            modal1: !this.state.modal1
        });
    }
    toggle2() {
        this.setState({
            modal2: !this.state.modal2
        });
    }
    toggle3() {
        this.setState({
            modal3: !this.state.modal3
        });
    }
    

    render() {
      const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle1}>&times;</button>;

      return (
        <div>
          <input id="postid"></input>
          <button className="button" onClick={this.getComments}>
            Show post's comments
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>PostID</th>
                <th>UserID</th>
                <th>Message</th>
                <th>LastEdited</th>
              </tr>
            </thead>
            <tbody>
              {this.state.CommentData.map(comments => (
                <tr key={comments.ID}>
                  <td>{comments.ID}</td>
                  <td>{comments.PostID}</td>
                  <td>{comments.UserID}</td>
                  <td>{comments.Message}</td>
                  <td>
                  { comments.LastEdit.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={this.toggle1}>Add comment</button>
            <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className} external={externalCloseBtn} >
            <ModalHeader></ModalHeader>
            <ModalBody>
                <div className="content">
                    <h2>Add comment</h2>
                    <form onSubmit={this.handleSubmit1}>
                        <label> {/* Automate with login*/}
                        Your ID:
                        <input type="text" name="UserID" onChange={this.onChange} />
                        </label>
                        <label>
                        message:
                        <input type="text" name="Message" onChange={this.onChange} />
                        </label>
                        <label>
                        LastEdited:
                        <input type="text" name="LastEdit" onChange={this.onChange} />
                        </label>
                        <br/>
                        <button className="button" type="submit">
                        Add
                        </button>
                    </form>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggle1}>Close</Button>
            </ModalFooter>
            </Modal>
          </div>
          <br/>
          <div>
            <button onClick={this.toggle2}>Delete comment</button>
            <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className} external={externalCloseBtn} >
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <div className="content">
                        <h2>Delete comment</h2>
                        <form onSubmit={this.handleSubmit2}>
                            <label> {/* Automate with login*/}
                            Comment ID:
                            <input type="number" name="ID" onChange={this.onChange} />
                            </label>
                            <br/>
                            <button className="button" type="submit">
                            Delete
                            </button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle2}>Close</Button>
                </ModalFooter>
                </Modal>
            </div>
            <br/>
            <div>
            <button onClick={this.toggle3}>Update comment</button>
            <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className} external={externalCloseBtn} >
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <div className="content">
                        <h2>Update comment</h2>
                        <form onSubmit={this.handleSubmit3}>
                            <label> {/* Automate with login*/}
                            Comment ID:
                            <input type="number" name="ID" onChange={this.onChange} />
                            </label>
                            <label> 
                            Message:
                            <input type="text" name="Message" onChange={this.onChange} />
                            </label>
                            <br/>
                            <button className="button" type="submit">
                            Update
                            </button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle3}>Close</Button>
                </ModalFooter>
            </Modal>
            </div>
        </div>
      );
    }
  }

  export default Comments;