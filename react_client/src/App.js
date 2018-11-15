import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Users from './Users';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreatePost from './CreatePost';
import PublicPosts from './PublicPosts';

import { NavLink, Route } from 'react-router-dom';
import DeletePost from './DeletePost';

require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar">
            <h1>Menu</h1>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/Users/">
              Users
            </NavLink>
            <NavLink to="/CreatePost">
              Create Post
            </NavLink>
            <NavLink to="/PublicPosts">
              View Public Posts
            </NavLink>
            <NavLink to="/DeletePost">
              Delete Post
            </NavLink>
            
        </div>
        <div className="Users-crud">
          <NavLink to="/Users/add">
            Add User
          </NavLink>
          <br/>
          <NavLink to="/Users/delete">
            Delete User
          </NavLink>
        </div>


        <Route path="/" exact component={Home} />
        <Route path="/createpost" exact component={CreatePost} />
        <Route path="/PublicPosts" exact component={PublicPosts} />
        <Route path="/deletepost" exact component={DeletePost} />
        <Route path="/Users/" exact component={Users} /> 
        <Route path="/Users/add" exact component={AddUser} />
        <Route path="/Users/delete" exact component={DeleteUser} />
      </div>
      
    );
  }
}

export default App;
