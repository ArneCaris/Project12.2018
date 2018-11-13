import React, { Component } from 'react';
import axios from 'axios';

class ViewPost extends Component {
constructor() {
    super();
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      posts: []
    };
  }
  getPosts() {
    axios.get(`http://localhost:3000/posts`).then(res => {
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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>When posted</th>
                <th>Is Private?</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(Post => (
                <tr key={Post.id}>
                  <td>{Post.title}</td>
                  <td>{Post.content}</td>
                  <td>{Post.whenposted}</td>
                  <td>{Post.isprivate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        );
    }
}

export default ViewPost;