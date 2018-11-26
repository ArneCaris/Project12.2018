import React, { Component } from 'react';
import axios from 'axios';

class ViewPost extends Component {
    constructor(){
        super();
        this.getPostsByID = this.getPostsByID.bind(this);
        this.state = {
            posts: [],
        }

    }

    getPostsByID() {
        axios.get(`http://localhost:3000/posts/:ID`).then(res => {
          const posts = res.data;
          this.setState({ posts });
        });
      }
    render() { 
        return (
            <div>
                <button className="button" onClick={this.getPostsByID}>btn</button>
                <div>
                    {this.state.posts.map( Post =>(
                    <div>
                        <p>{Post.ID}</p>
                        <p>{Post.Title}</p>
                        <p>{Post.Content}</p>
                    </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ViewPost;