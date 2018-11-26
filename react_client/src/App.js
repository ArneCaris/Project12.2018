import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import Posts from './Posts';
import Login from "./Login";
import ShareEntry from './ShareEntry';
import EditPost from './EditPost';
import postbycategory from './PostsByCategory';
import Gaming from './PostsByCategory';
import Technology from './PostsByCategory';
import Vehicles from './PostsByCategory';
import axios from 'axios';

import test from './test';
import { NavLink, Route } from 'react-router-dom';
import PostModal from './Components/PostModal';



import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {
  constructor (props) {
    super (props);
    this.getValues = this.getValues.bind(this);
    this.searchData = this.searchData.bind(this);
    this.state = {
      isOpen: false,
      searchUsers: [],
      list: undefined
    }
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  

  searchData(e) {
    var queryData = [];
    this.getValues();
    if (e.target.value != '') {
      this.state.searchUsers.forEach(function(person){
        if (person.toString().toLowerCase().indexOf(e.target.value)!=-1) {
          if (queryData.length < 100) {
            queryData.push(person);
            
          }
          
        };
         
      });
      console.log(queryData) 
    }
    this.setState({list: queryData});
    
  }

  

  getValues() {
    axios.get('http://localhost:3000/Users').then(res => {
      var searchUsers = res.data;
      this.setState({ searchUsers })
      searchUsers = this.state.searchUsers.map(user => (user.username));
      console.log(searchUsers) 
      
    })
    
  }
     
  

  render () {

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <div className="App">
        <div className="navbar">

            <NavLink to="/" id="logo">
              <h2>DiLog</h2>
            </NavLink>

            <div className="dropdown" onClick={this.toggleOpen}  >
                <button 
                    className="btn btn-secondary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true"
                                      >
                    Categories
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                    <NavLink to="/Posts/category/lifestyle" className="dropdown-item">Lifestyle</NavLink>
                    <a className="dropdown-item" href="http://localhost:3001/posts/category/gaming">Gaming</a>
                    <a className="dropdown-item" href="http://localhost:3001/posts/category/technology">Technology</a>
                    <a className="dropdown-item" href="http://localhost:3001/posts/category/vehicles">Vehicles</a>
                </div>

            </div>
            
            <SearchBar search={this.searchData.bind(this)} />
            {(this.state.list) ? <SearchResult searchUsers={this.state.list} /> : null }
            
            <NavLink className="navigation" to="/Users/" />
        </div>
        
        
        <hr/>

      
        <div>
      
              <NavLink to="/Users/">
                Users
              </NavLink>
              <NavLink className="navigation" to="/CreatePost">
                Create Post
              </NavLink>
              <NavLink className="navigation" to="/Post">
                View Posts
              </NavLink>
              <NavLink className="navigation" to="/EditPost">
                edit post
              </NavLink>
              <NavLink to="/Users/delete">
                  Delete User
              </NavLink>
              <NavLink to="/test">
                  test
              </NavLink>
              <br/>
              <NavLink className="navigation" to="/ShareEntry">
                Share with
              </NavLink>
 
            <div className="userLogin">
                <NavLink to="/Users/add">
                  Add User
                </NavLink>
                <br/>
                <NavLink to="/Users/delete">
                  Delete User
                </NavLink>
            </div>

          <Route path="/test" exact component={test} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/Post" exact component={Posts} />
          <Route path="/deletepost" exact component={DeletePost} />
          <Route path="/editpost" exact component={EditPost} />
          <Route path="/Users/" exact component={Users} /> 
          <Route path="/Users/add" exact component={AddUser} />
          <Route path="/Users/delete" exact component={DeleteUser} />
          <Route path="/login" exact component={Login} />
          <Route path="/ShareEntry" exact component={ShareEntry} />
          <Route path="Posts/category/lifestyle" exact component={postbycategory} />

        </div>
      </div>
    )
  }
}

class SearchBar extends React.Component {
  render () {
    return(
      <div >
        <input onChange={this.props.search} placeholder="Search users" />
      </div>
    )
  }
}
class SearchResult extends React.Component {
  render () {
    return(
      <div>
        <ul>
          {this.props.searchUsers.map(function(value) {
            return <Item key={value} val={value} />
          })}
        </ul>
      </div>
    )
  }
}
class Item extends React.Component {
  render() {
    return(
      <li>
        {this.props.val}
      </li>
    )
  }
}

export default App;
