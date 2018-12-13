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
import privateposts from './PrivatePosts'
import mysharedposts from './MySharedPosts'
import comments from './Comments'
import Navigator from './Components/Navigator';
import test from './test';
import { NavLink, Route } from 'react-router-dom';




require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {


  render () {
    return (
      <div className="App">
        <Navigator/>
        <div className="routeDiv">
          
          <Route path="/comments" exact component={comments} />
          <Route path="/Users/" exact component={Users} /> 
          <Route path="/signup" exact component={AddUser} />
          <Route path="/login" exact component={Login} />
          <Route path="/ShareEntry" exact component={ShareEntry} />
          <Route path="/posts/category/lifestyle" exact component={postbycategory} />
          <Route path="/posts/category/gaming" exact component={postbycategory} />
          <Route path="/posts/category/vehicles" exact component={postbycategory} />
          <Route path="/posts/category/technology" exact component={postbycategory} />
          <Route path="/posts/private" exact component={privateposts} />
          <Route path="/shared/mine" exact component={mysharedposts} />
          <Route path="/" exact component={test} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/Post/Delete" exact component={DeletePost} />
        </div>
      </div>
    )
  }
}
export default App;