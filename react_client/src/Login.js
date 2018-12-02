import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./Login.css";



export class Login extends Component {
    constructor() { 
        super();
          this.getUsers = this.getUsers.bind(this);
          this.state = {
            Users: []
          }; 
    
      }
      
      getUsers() {
          axios.get(`http://localhost:3000/Users/`).then(res => {
              const Users = res.data;
              this.setState({ Users }); 
              
              var loginU = document.getElementById('username').value;
              var loginP = document.getElementById('password').value;
              
              
              
              for ( var x = 0; x < Users.length; x++){
                  if(Users[x].username === loginU)
                  {
                      if(Users[x].password === loginP)
                      {       

                        var CurrUser = {
                            id: Users[x].ID,
                            username: Users[x].username,
                            isAuthenticated: true
                        }

                        localStorage.setItem( 'userID', JSON.stringify(CurrUser.id) );
                        localStorage.setItem( 'userUsername', JSON.stringify(CurrUser.username) );
                        localStorage.setItem( 'isAthenticated', JSON.stringify(CurrUser.isAuthenticated) );
                        
                        this.props.history.push('/Post');
                            
                        break;
                        
                        } 
                          
                      }
                  }
                }      
                );
            }
      
    render() {

        return (
            <div className="Login">
            <form onClick={() => this.getUsers()}>
            <FormGroup controlId="username" bsSize="large">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                autoFocus
                type="username" id="username"
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                type="password" id="password"
                />
            </FormGroup>
            <Button
                block
                bsSize="large"
                type="button"
                >
                Login
            </Button>
            </form>
            <br/> <br/>
        </div>
    
        ); 
              
    }         
}