import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import Posts from './Posts';
import Login from './Login';
import ShareEntry from './ShareEntry';
import EditPost from './EditPost';
import postbycategory from './PostsByCategory';
import comments from './Comments'
import Gaming from './PostsByCategory';
import Technology from './PostsByCategory';
import Vehicles from './PostsByCategory';
import axios from 'axios';

import Test from './Test';
import Wholepost from './Components/Wholepost';
import { NavLink, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Badge } from 'reactstrap';



import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {
  constructor (props) {
    super (props);
    this.getValues = this.getValues.bind(this);
    this.searchData = this.searchData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      searchUsers: [],
      list: undefined
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  

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
       
    }
    this.setState({list: queryData});
    console.log(queryData[1])
  }


  getValues() {
    axios.get('http://localhost:3000/Users').then(res => {
      const searchUsers = res.data;
      this.setState({ searchUsers })
      const var1 = this.state.searchUsers.map(user => (user.username));
      console.log(var1) 
      
    })
    
  }
     
  

  render () {



    return (
      <div className="App">
        <div className="navbar">

            <NavLink to="/" id="logo">
              <h2>DiLog</h2>
            </NavLink>

            <div className="dropdown">
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><NavLink to="/posts/category/lifestyle" className="dropdown-item">Lifestyle</NavLink></DropdownItem>
                  <DropdownItem><NavLink to="/posts/category/gaming" className="dropdown-item">Gaming</NavLink></DropdownItem>
                  <DropdownItem><NavLink to="/posts/category/vehicles" className="dropdown-item">Vehicles</NavLink></DropdownItem>
                  <DropdownItem><NavLink to="/posts/category/technology" className="dropdown-item">Technology</NavLink></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

            </div>
            
            <SearchBar search={this.searchData.bind(this)} />
            {(this.state.list) ? <SearchResult searchUsers={this.state.list} /> : null }
            
            <NavLink className="navigation" to="/Users/" />
        </div>
        <Frontpage/>
        
        <hr/>

      
      <div>
              <NavLink className="navigation" to="Wholepost">
                herefortesting
              </NavLink>
              <NavLink to="/Users/">
                Users
              </NavLink>
              <NavLink className="navigation" to="/CreatePost">
                Create Post
              </NavLink>
              <NavLink className="navigation" to="/Post/view">
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
              <NavLink to="/Test">
                  test
              </NavLink>
              <br/>
              <NavLink className="navigation" to="/ShareEntry">
                Share with
              </NavLink>
              <br/>
 
            <div className="userLogin">
                <NavLink to="/Users/add">
                  Add User
                </NavLink>
                <br/>
                <NavLink to="/Users/delete">
                  Delete User
                </NavLink>
            </div>


       
      
        <Route path="/Post/view" exact component={Posts} />
        <Route path="/comments" exact component={comments} />
        
        <Route path="/editpost" exact component={EditPost} />
        <Route path="/Users/" exact component={Users} /> 
        <Route path="/Users/add" exact component={AddUser} />
        <Route path="/Users/delete" exact component={DeleteUser} />
        <Route path="/login" exact component={Login} />
        <Route path="/ShareEntry" exact component={ShareEntry} />
        <Route path="/posts/category/lifestyle" exact component={postbycategory} />
        <Route path="/posts/category/gaming" exact component={postbycategory} />
        <Route path="/posts/category/vehicles" exact component={postbycategory} />
        <Route path="/posts/category/technology" exact component={postbycategory} />
          <Route path="/Test" exact component={Test} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/Post" exact component={Posts} />
          <Route path="/Wholepost" exact component={Wholepost} />
          <Route path="/Post/Delete" exact component={DeletePost} />
          
          
          
          
          
          
          


        </div>
      </div>
    )
  }
}

class Frontpage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    };
  }
  render() {
    return(
      <Router>
        <div>

        </div>
      </Router>
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