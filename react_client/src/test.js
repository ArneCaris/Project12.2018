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
import PropTypes from 'prop-types';


class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      text: '',
      ID: '',
      hidePost: false
    };
    this.hidePost = this.hidePost.bind(this);
    this.showPost = this.showPost.bind(this);

  }

  componentDidMount() {
    axios.get(`http://localhost:3000/posts/public`).then(results => {
      const posts = results.data;
      this.setState({ posts });
    });
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  handlePostClick(posts){
    this.props.history.push('/posts/${Post.ID}')
  }

  hidePost(){
    this.setState({hidePost: true});
  }
  showPost(){
    this.setState({showPost: false});
  }

render() {
    return(
      <div>
        <div className="for-posts">
            {this.state.posts.map(Post =>(
              <div className="postdiv" data-id={Post.ID}>
              <p className="for-id">#{Post.ID} Last edited: {Post.LastEdit}</p>
              <h4 onClick={() => this.handlePostClick(Post)} key={Post.id}>{Post.Title}<Badge color="info" className="category-badge">{Post.Category}</Badge></h4>
              <p>{Post.Content}</p>
              </div>
            ))}
        </div>
      </div>
    );
}
}

export default Test;