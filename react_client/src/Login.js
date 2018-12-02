import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./Login.css";



export class Login extends Component {
    constructor() { 
        super();
          this.getUsers = this.getUsers.bind(this);
          this.handleEnter = this.handleEnter.bind(this);
          this.handleEvent = this.handleEvent.bind(this);
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
                        
                        sessionStorage.setItem( 'userID', JSON.stringify(CurrUser.id) );
                        sessionStorage.setItem( 'userUsername', JSON.stringify(CurrUser.username) );
                        sessionStorage.setItem( 'isAthenticated', JSON.stringify(CurrUser.isAuthenticated) );
                        
                        this.props.history.push('/Post');
                        
                        break;
                        
                    } 
                    
                }
            }      
        }
        );
    }
    
    handleEnter(event) {
        if (event.key === 'Enter') {

            this.handleEvent();
        }
    }

    handleEvent() {
        if(document.getElementById("password").value.length > 3) {
                
            this.getUsers();

        } else {
            alert("Password should be more than 4 characters long.");
        }

    }
    
    render() {
        
        return (
            <div className="Login">
            <form>
            <FormGroup controlId="username" bsSize="large">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                autoFocus
                onKeyPress={this.handleEnter}
                type="username" id="username"
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                minLength="4"
                maxLength="20"
                type="password"
                 id="password"
                onKeyPress={this.handleEnter}
                />
            </FormGroup>
            <Button
                id="LoginBTN"
                block
                onClick={this.handleEvent}
                bsSize="large"
                >
                Login
            </Button>
            </form>
            <br/> <br/>
        </div>
    
        ); 
              
    }         
}