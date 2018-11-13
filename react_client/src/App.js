import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import UserTable from './UserTable';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import BorrowerTable from './BorrowerTable';
import AddBorrower from './AddBorrower';
import UpdateBorrower from './UpdateBorrower';
import DeleteBorrower from './DeleteBorrower';
import { NavLink, Route } from 'react-router-dom';

require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand")



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar">
            <h1>Menu</h1>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/Users">
              Users
            </NavLink>
            <br/>
            
        </div>
        <div className="Users-crud">
          <NavLink to="/Users/add">
              Add User    |
          </NavLink>
          <NavLink to="/Users/delete">
              |    Delete User
          </NavLink>
        </div>

        <Route path="/" exact component={Home} />
        <Route path="/Users" exact component={UserTable} /> 
        <Route path="/Users/add" exact component={AddUser} />
        <Route path="/Users/delete" exact component={DeleteUser} />
      </div>
      
    );
  }
}

export default App;
