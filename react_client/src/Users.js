import React, { Component } from 'react';
import axios from 'axios';

  class Users extends Component {
    constructor() {
      super();
      this.getUsers = this.getUsers.bind(this);
      this.state = {
        Users: []
      };
    }

  getUsers() {
      const username = document.getElementById("username").value;
      axios.get(`http://localhost:3000/Users/` + username).then(res => {
        const Users = res.data;
        this.setState({ Users });
      });
    }

    render() {
      return (
        <div>
            <label>
              Username:
              <input id="username" type="string" name="username" onKeyUp={this.getUsers}/>
            </label>
            <button className="button" onClick={this.getUsers}>
              Show User
            </button>
          
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>username</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Users.map(user => (
                <tr key={user.ID}>
                  <td>{user.ID}</td>
                  <td>{user.username}</td>
                  <td> {user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  export default Users;
  
  export function getUsers() {
    const username = document.getElementById("username").value;
    axios.get(`http://localhost:3000/Users/` + username).then(res => {
      const Users = res.data;
      if (Users === true){
       document.getElementById("user_test").value = "Hell yeah my dude";
      };
    });
  };