import React, { Component } from 'react';

import axios from 'axios';

class PublicPosts extends Component {
constructor() {
    super();
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      posts: []

    };
  }
  getPosts() {
    axios.get(`http://localhost:3000/posts/public`).then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }
    render() {
        return (
        <div>
          <button className="button" onClick={this.getPosts}>
            Show posts
          </button>
          <table className="">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>When posted</th>
                <th>Last Edited</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(Post => (
                <tr key={Post.ID}>
                  <td>{Post.ID}</td>
                  <td>{Post.Title}</td>
                  <td>{Post.Content}</td>
                  <td>{Post.Category}</td>
                  <td>{Post.WhenPosted}</td>
                  <td>{Post.LastEdited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        );
    }
}

export default PublicPosts;