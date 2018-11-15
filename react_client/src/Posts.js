import React, { Component } from 'react';
  import axios from 'axios';

  class Posts extends Component {
    constructor() {
      super();
      this.getPublicPosts = this.getPublicPosts.bind(this);
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

    render() {
      return (
        <div>
          <button className="button" onClick={this.getPublicPosts}>
            Show Public Posts
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>UserID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>isPrivate</th>
                <th>LastEdited</th>
              </tr>
            </thead>
            <tbody>
              {this.state.postData.map(post => (
                <tr key={post.ID}>
                  <td>{post.ID}</td>
                  <td>{post.UserID}</td>
                  <td> {post.Title}</td>
                  <td>{post.Content}</td>
                  <td>{post.Category}</td>
                  <td>{post.isPrivate}</td>
                  <td>
                  { post.LastEdit.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  export default Posts;