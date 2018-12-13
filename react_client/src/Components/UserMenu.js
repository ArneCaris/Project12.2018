import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBan} from '@fortawesome/free-solid-svg-icons';

class UserMenu extends Component {
    constructor(){
        super();

    }

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
                        <h6>Welcome, <b>{sessionStorage.userUsername}</b></h6>
                        <br/>
                        <NavLink to="/createpost" style={{color: 'black', fontSize: '20px'}}>
                            Create Post
                        </NavLink>
                        <br/>
                    <NavLink style={{color: 'black'}} to="/">View Private Posts</NavLink>
                        <br/>
                    <NavLink style={{color: 'black'}} to="/">View Shared Posts</NavLink>
                        <br/>
                        <div className="delete-options">
                        <NavLink className="logout-link" to="/" onClick={this.handleLogout} id="logout">
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                            Logout
                        </NavLink>
                        <br/>
                        <NavLink className="logout-link" to="/close_account">
                            <FontAwesomeIcon icon={faBan}/>
                            Terminate Account
                        </NavLink>
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