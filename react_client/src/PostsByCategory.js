import React, { Component } from 'react';
import { Badge } from 'reactstrap';
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
            <div className="for-posts">
              {this.state.Categories.map(post => (
              <div className="postdiv">
                <ul>
                  <li>ID: <i>{post.ID}</i></li>
                  <li onClick={this.props.handleModal} id="forloop" className={post.ID}><h3>{post.Title}</h3></li>
                  <li><p>{post.Content}</p></li>
                  <Badge>{post.Category}</Badge>
                  <li>{post.LastEdit}</li>
                </ul>
              </div>
              ))}
            </div>
        </div>
      );
    }
  }

  export default PostsByCategory;