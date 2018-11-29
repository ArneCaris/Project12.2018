import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import OptionModal from './Components/OptionModal';
import { Badge } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wholepost from './Components/Wholepost';
import NavigationButton from './Components/NavigationButton';

import RemoveButton from './Components/RemoveButton';

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      ID: '',
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/posts/public`).then(results => {
      const posts = results.data;
      this.setState({ posts });
    });
  }

    handleRemove = ID => {
    this.setState ({
      posts: this.state.posts.filter( Post => Post.ID !== ID)
    });
  };


render() {

    return(
      <div>
        <div className="for-posts">
            {this.state.posts.map(Post =>(
            <ul>
              <div className="postdiv" data-id={Post.ID}>
              <RemoveButton {...Post} removePost={this.handleRemove} />
              <p className="for-id">#{Post.ID} Last edited: {Post.LastEdit}</p>
                <h4>{Post.Title}</h4><Badge color="info" className="category-badge">{Post.Category}</Badge>
              <p className="text">{Post.Content}</p>
              <section>
                <NavigationButton/>
              </section>
              </div>
            </ul>
            ))}
        </div>
      </div>
    );
}
}

export default Test;