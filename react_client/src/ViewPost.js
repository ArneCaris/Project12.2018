import React, { Component } from 'react';
import axios from 'axios';

class ViewPost extends Component {
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.getPostsByID = this.getPostsByID.bind(this);
        this.state = {
            posts: [],
        }

    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    getPostsByID() {
        axios.get(`http://localhost:3000/posts/:ID`).then(res => {
          const posts = res.data;
          this.setState({ posts });
        });
      }
    render() { 
        return (
            <div>
                <input type="name" onChange={this.onChange}/>

            <div>
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
            </div>
        );
    }
}

export default ViewPost;