import React, { Component } from 'react';
import axios from 'axios';
import test from './test';

  class Posts extends Component {
    constructor() {
      super();
      this.getPublicPosts = this.getPublicPosts.bind(this);
      this.getPrivateNotes = this.getPrivateNotes.bind(this);
      this.state = {
        postData: []
      };
    }
    getPublicPosts() {
      axios.get(`http://localhost:3000/Posts/public`).then(res => {
        const postData = res.data;
        this.setState({ postData });
      });
    }
    getPrivateNotes() {
      const ide = document.getElementById("ide").value; 
      axios.get(`http://localhost:3000/Posts/private/user/` + ide).then(res => {
        const postData = res.data;
        this.setState({ postData });
      });
    }

    render() {
      return (
        <div>
          <button className="button" onClick={this.getPrivateNotes}>
            Show Private Notes
          </button>
          <br/>
          <input id="ide"></input>
          <test/>
        </div>
      );
    }
  }

  export default Posts;