import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  getPosts() {
    axios.get(`http://localhost:3000/posts/public`).then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div>
        <button onClick={this.toggle}>Open</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn} >
          <ModalHeader></ModalHeader>
          <ModalBody>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default PostModal;