import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import AddUser from './AddUser';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import Posts from './Posts';
import { Login } from './Login';
import ShareEntry from './ShareEntry';
import postbycategory from './PostsByCategory';
import Navigator from './Components/Navigator';
import { NavLink, Route } from 'react-router-dom';
import PrivatePosts from "./PrivatePosts";




require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {


  render () {
    return (
      <div className="App">
        <Navigator/>
        <div className="routeDiv">

          <Route path="/Users/" exact component={Users} /> 
          <Route path="/signup" exact component={AddUser} />
          <Route path="/login" exact component={Login} />
          <Route path="/ShareEntry" exact component={ShareEntry} />
          <Route path="/posts/category/lifestyle" exact component={postbycategory} />
          <Route path="/posts/category/gaming" exact component={postbycategory} />
          <Route path="/posts/category/vehicles" exact component={postbycategory} />
          <Route path="/posts/category/technology" exact component={postbycategory} />
          <Route path="/" exact component={Posts} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/Post/Delete" exact component={DeletePost} />
          <Route path="/posts/private" exact component={PrivatePosts} />
        </div>
      </div>
    )
  }
}
export default App;