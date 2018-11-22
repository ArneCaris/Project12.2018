import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import PostModal from './Components/PostModal';
import { Badge } from 'reactstrap';

class test extends Component {

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    constructor() {
        super();
        this.getPosts = this.getPosts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

      handleSubmit = event => {
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
            <button className="button" onClick={this.getPosts}>GET EM'</button>
            <div className="for-posts">
                {this.state.posts.map(Post =>(
                  <div className="post-div" key={Post.ID}>
                  <p className="for-id">#{Post.ID} Last edited: {Post.LastEdit}</p>
                  <h4>{Post.Title} <Badge color="info" className="category-badge">{Post.Category}</Badge></h4>
                  <p>{Post.Content}</p>
                  <PostModal
                    key={Post.ID}
                    />
                  </div>
                ))}
            </div>
          </div>
        );
    }
}

export default test;