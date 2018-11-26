import React, { Component } from 'react';
import axios from 'axios';

  class PostsByCategory extends Component {
    constructor() {
      super();
      this.getUsers = this.getUsers.bind(this);
      this.state = {
        Users: []
      };
    }

  getUsers() {
      const category = document.getElementById("category").value;
      axios.get(`http://localhost:3000/Posts/category/` + category).then(res => {
        const Users = res.data;
        this.setState({ Users });
      });
    }

    render() {
      return (
        <div>
            <label>
              category:
              <input id="category" type="string" name="category"/>
            </label>
            <button className="button" onClick={this.getUsers}>
              Show Category
            </button>
          
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>userID</th>
                <th>title</th>
                <th>content</th>
                <th>category</th>
                <th>privacy</th>
                <th>latest edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Users.map(post => (
                <tr key={post.ID}>
                  <td>{post.ID}</td>
                  <td>{post.UserID}</td>
                  <td> {post.Title}</td>
                  <td> {post.Content}</td>
                  <td> {post.Category}</td>
                  <td> {post.isPrivate}</td>
                  <td> {post.LastEdit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  export default PostsByCategory;