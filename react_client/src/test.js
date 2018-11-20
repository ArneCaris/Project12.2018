import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

class test extends Component {

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
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
        const menuClass = `dropdown-menu${this.state.isOpen ? "show" : " "}`;
        return (
          <div>
            <button className="button" onClick={this.getPosts}>
              reload for posts
            </button> 
            <div className="for-posts">
              {this.state.posts.map(Post =>(
            <div className="post-div">
              <h4>{Post.Title}</h4>
              <p>{Post.Content}</p>
              <div className="dropdown-post" onClick={this.toggleOpen}>
                <button
                    className="btn btn-secondary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown-post" 
                    aria-haspopup="true">
                   ...
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#nogo">Update</a>
                    <a className="dropdown-item" href="#nogo">Share</a>
                    <button className="dropdown-item" type="submit">Delete</button>
                </div>
            </div>

            </div>
            ))}
            </div>
            </div>
        );
    }
}

export default test;