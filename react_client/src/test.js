import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class test extends Component {

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    constructor() {
        super();
        this.getPosts = this.getPosts.bind(this);

        this.state = {
          posts: [],
          ID: '',
        };
      }

      getPosts() {
        axios.get(`http://localhost:3000/posts/public`).then(res => {
          const posts = res.data;
          this.setState({ posts });
        });
      }

      handleClick = event => {
        event.preventDefault();
        const id = this.state.ID;
        const { ID } = this.state;

        axios.delete('http://localhost:3000/posts/' + id, {ID})
        .then(res => {
          console.log(res);
          console.log(res.data);
          });
      };

    

    render() {
        return (
            <div>
              <button className="button" onClick={this.getPosts}>
                reload for posts
              </button> 
            <div className="for-posts">
              {this.state.posts.map(Post =>(
            <div className="post-div" id={Post.ID}>
            <p className="for-id">#{Post.ID} Last edited: {Post.LastEdit}</p>
              <h4>{Post.Title}</h4>
              <p>{Post.Content}</p>
            <button className="delete-btn" onClick={this.deletePost}>bye</button>
        </div>
        ))}
        </div> 
        </div>
        );
    }
}

export default test;