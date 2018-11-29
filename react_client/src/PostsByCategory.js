import React, { Component } from 'react';
import axios from 'axios';

  class PostsByCategory extends Component {
    constructor() {
      super();
      this.getCategory = this.getCategory.bind(this);
      this.state = {
        Categories: []
      };
    }

  getCategory() {
    const item1 = "lifestyle"
    const item2 = "gaming"
    const item3 = "vehicles"
    const item4 = "technology"
    const url = window.location.href
    if (url.includes(item1)) {
      axios.get(`http://localhost:3000/Posts/category/` + item1).then(res => {
        const Categories = res.data;
        this.setState({ Categories });
      });}
    if (url.includes(item2)) {
      axios.get(`http://localhost:3000/Posts/category/` + item2).then(res => {
        const Categories = res.data;
        this.setState({ Categories });
      });}
    if (url.includes(item3)) {
      axios.get(`http://localhost:3000/Posts/category/` + item3).then(res => {
        const Categories = res.data;
        this.setState({ Categories });
      });}
    if (url.includes(item4)) {
      axios.get(`http://localhost:3000/Posts/category/` + item4).then(res => {
        const Categories = res.data;
        this.setState({ Categories });
      });}
    
    }

    render() {
      return (
        <div>
            <button className="button" onClick={this.getCategory}>
              Show posts
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
              {this.state.Categories.map(post => (
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