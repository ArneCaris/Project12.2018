import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import swal from 'sweetalert2';

class UserMenu extends Component {
    constructor(){
        super();
        this.deleteAccount = this.deleteAccount.bind(this);
        this.state = {
            ID: '',
            username: '',
            password: '',
        };
    }

    deleteAccount = () =>{
        const id = sessionStorage.getItem("userID");
        const { ID, username, password } = this.state;
        axios
            .delete('http://localhost:3000/Users/' + id, { ID, username, password })
            .then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    sessionStorage.clear();
                    window.location.reload();
                }
            });
    };

    confirmDeletion(){
        swal({
                title: 'Are you sure?',
                text: "This will permanently delete your user",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.value) {
                    this.deleteAccount();
                    swal(
                        'Terminated!',
                        'User has been terminated',
                        'success'
                    )
                }
        })
    };

    handleLogout () {
        sessionStorage.clear();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="for-menu">
                {sessionStorage.length !== 0
                    ?
            <div className="user-menu">
                    <div>
                        <h6>Logged in as: <b>{sessionStorage.userUsername}</b></h6>
                        <br/>
                        <NavLink to="/createpost" style={{color: 'black', fontSize: '20px'}}>
                            Create Post
                        </NavLink>
                        <br/>
                        <NavLink style={{color: 'black'}} to="/posts/private">View Private Posts</NavLink>
                        <br/>
                        <NavLink style={{color: 'black'}} to="/shared/mine">View Shared Posts</NavLink>
                        <br/>
                        <div className="delete-options">
                            <br/>
                        <NavLink className="logout-link" to="/" onClick={this.handleLogout} id="logout">
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                            Logout
                        </NavLink>
                        <button onClick={() => this.confirmDeletion()} className="terminate-btn">
                        <FontAwesomeIcon icon={faBan}/>
                            Terminate User
                        </button>
                        </div>
                    </div>
            </div>
                    :
                    <p></p>
                }
            </div>
        );
    }
}

export default UserMenu;