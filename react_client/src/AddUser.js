import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import swal from 'sweetalert2';
import "./Login.css";


class AddUser extends Component {
    constructor() {
    super();
    this.getUsers = this.getUsers.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        ID: '',
        username: '',
        password: '',
        Users: []
    };
    }

    componentDidMount () {
        this.getUsers();
    }

    getUsers() {
        if(sessionStorage.length != 0){
            sessionStorage.clear();
        } else {
            axios.get(`http://localhost:3000/Users/`).then(res => {
                const Users = res.data;
                this.setState({ Users });
                var loginU = document.getElementById('username').value;
                var loginP = document.getElementById('password').value;
                
             
                
                    for ( var x = 0; x < this.state.Users.length; x++){
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
                            
                            this.props.history.push('/');
                            

                            break;
                            
                            } 
                                
                        } 
                    }

                }
            );
        }

    }       

    handleEnter(event) {
        if (event.key === 'Enter') {

            this.handleSubmit();
        }
    }

    handleSubmit () {
        const { ID } = this.state;
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value    

        if(document.getElementById("password").value.length > 3 ) {
            
            axios
            .post('http://localhost:3000/Users', { ID, username, password })
            .then(res => {
                this.getUsers();
                const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                
                });
                if (res.data.code != 'ER_DUP_ENTRY')
                toast({
                    type: 'success',
                    title: 'Sign-up Successful!'
                })
                else { 
                    swal ( 'Oopsie!',
                            'Username is already in use.',
                            'warning')
                }
            });

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

        };
        

    render() {
        return (
            <div className="Login">

            <form>
                <h3>*DISCLAIMER*</h3>
                <p>This is a demo</p>
                <p>Please do not use your <b>REAL</b> password</p>
                <br/>
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
                type="password" id="password" onKeyPress={this.handleEnter}
                />
            </FormGroup>
            <Button
                block
                bsSize="large"
                type="button"
                onClick={this.handleSubmit}
                >
                Signup
            </Button>
            </form>
            <br/> <br/>
        </div>
        );
    }
}

export default AddUser;