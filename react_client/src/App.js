import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Users from './Users';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import Posts from './Posts';
import Login from "./Login";

import { NavLink, Route } from 'react-router-dom';



require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });


  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="App">
        <div className="navbar">
            
            <NavLink to="/" id="logo">
              <h2>DiLog</h2>
            </NavLink>

            <div className="dropdown" onClick={this.toggleOpen}>
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
                    <a className="dropdown-item" href="#nogo">Lifestyle</a>
                    <a className="dropdown-item" href="#nogo">Gaming</a>
                    <a className="dropdown-item" href="#nogo">Technology</a>
                    <a className="dropdown-item" href="#nogo">Vehicles</a>
                </div>
            </div>
            
            

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

        <hr/>

        <Route path="/" exact component={Home} />
        <Route path="/createpost" exact component={CreatePost} />
        <Route path="/Post" exact component={Posts} />
        <Route path="/deletepost" exact component={DeletePost} />
        <Route path="/Users/" exact component={Users} /> 
        <Route path="/Users/add" exact component={AddUser} />
        <Route path="/Users/delete" exact component={DeleteUser} />
        <Route path="/login" exact component={Login} />
      </div>
      
    );
  }
}

export default App;
