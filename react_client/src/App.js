import React, { Component, Fragment } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import Posts from './Posts';
import { Login } from './Login';
import ShareEntry from './ShareEntry';
import EditPost from './EditPost';
import postbycategory from './PostsByCategory';
import comments from './Comments'
import Gaming from './PostsByCategory';
import Technology from './PostsByCategory';
import Vehicles from './PostsByCategory';
import Navigator from './Components/Navigator';
import axios from 'axios';
import test from './test';
import { NavLink, LinkContainer, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {
  constructor (props) {
    super (props);
  }


  handleLogout () {
    sessionStorage.clear();
    window.reload();
  }

  render () {
    return (
      <div className="App">
        <Navigator/>
        <hr/>
        {sessionStorage.length !== 0
        ? 
          <div><NavLink className="navigation" to="/CreatePost">
            Create Post
          </NavLink>
          <NavLink className="navigation" to="/">
            View Posts
          </NavLink>
          <NavLink className="navigation" to="/comments">
            View comments
          </NavLink>
          <NavLink className="navigation" to="/EditPost">
            edit post
          </NavLink>
          <NavLink to="/Post/Delete">
              Delete Post
          </NavLink>

          <NavLink className="navigation" to="/ShareEntry">
            Share with
          </NavLink>
          <NavLink to="/close_account">
            Close Account
          </NavLink> </div>
        : 
          <div>
          <NavLink to="/Users/">
            Users
          </NavLink>
          <NavLink className="navigation" to="/">
            View Posts
          </NavLink>
          </div>
        }
          <br/>
      <div >
          <NavLink to="/Users/add">
            Add User
          </NavLink>
          <br/>
          <NavLink to="/Users/delete">
            Delete User
          </NavLink>
          <br/>
          <NavLink to="/test">
              test
          </NavLink>
          <br/>
          <NavLink to="/Users/">
            Users
          </NavLink>
          <br/>
      </div>
        <hr/>
        {sessionStorage.length !== 0
          ? <NavLink to="/post" onClick={this.handleLogout}>Logout</NavLink>
          : 
            <Fragment>
                <NavLink to="/signup">Signup</NavLink> <br/>
                <NavLink to="/login">Login</NavLink>
            </Fragment>
        }
      <hr/>
        <div className="routeDiv">
          <Route path="/" exact component={Posts} />
          <Route path="/comments" exact component={comments} />
          <Route path="/editpost" exact component={EditPost} />
          <Route path="/Users/" exact component={Users} /> 
          <Route path="/signup" exact component={AddUser} />
          <Route path="/close_account" exact component={DeleteUser} />
          <Route path="/login" exact component={Login} />
          <Route path="/ShareEntry" exact component={ShareEntry} />
          <Route path="/posts/category/lifestyle" exact component={postbycategory} />
          <Route path="/posts/category/gaming" exact component={postbycategory} />
          <Route path="/posts/category/vehicles" exact component={postbycategory} />
          <Route path="/posts/category/technology" exact component={postbycategory} />
          <Route path="/test" exact component={test} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/Post/Delete" exact component={DeletePost} />
        </div>
      </div>
    )
  }
}
export default App;