import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer ,toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert2';



export class Login extends Component {
    constructor(props) { 
        super(props);
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

              const usernames = this.state.Users.map(user => (user.username));

              if (usernames.length != 0){

              for ( var x = 0; x < usernames.length; x++){
                  if(Users[x].username === loginU)
                  {
                      if(Users[x].password === loginP)
                      {       
                          
                          var CurrUser = {
                            id: Users[x].ID,
                            username: Users[x].username,
                            isAuthenticated: true
                        };
                        
                        sessionStorage.setItem( 'userID', JSON.stringify(CurrUser.id) );
                        sessionStorage.setItem( 'userUsername', JSON.stringify(CurrUser.username) );
                        sessionStorage.setItem( 'isAuthenticated', JSON.stringify(CurrUser.isAuthenticated) );

                        const toast = swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });

                          toast({
                              type: 'success',
                              title: 'Signed in successfully'
                          });
                        
                        this.props.history.push('/');
                        
                        break;
                        
                    } 
                    
                } else {
                    swal ( 'Oopsie!',
                            'User with this username does not exist!',
                            'error')
                }
            }      
        } else {
            swal ( 'Oopsie!',
                            'User with this username does not exist!',
                            'error')
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
            const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            toast({
                type: 'error',
                title: 'Password must be longer than 4 characters.'
            })
        }


    }
    
    render() {
        
        return (
            <div className="Login">
            <ToastContainer/>
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
                <br/>
                <NavLink to="/signup">Not Registered?</NavLink>
            <br/>
        </div>
    
        ); 
              
    }         
}