import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";

class UserMenu extends Component {
    constructor(){
        super();

    }

    handleLogout () {
        sessionStorage.clear();
        window.reload();
    }

    render() {
        return (
            <div className="user-menu">
                {sessionStorage.length !== 0
                    ?
                    <div>
                        <h6>Welcome, {sessionStorage.userUsername}</h6>
                    <NavLink to="/">View Private Posts</NavLink>
                        <br/>
                    <NavLink to="/">View Shared Posts</NavLink>
                        <br/>
                        <NavLink className="logout-link" to="/test" onClick={this.handleLogout} id="logout">Logout</NavLink>
                    </div>
                    :
                    <Fragment className="logSign">
                        <NavLink to="/signup">Signup</NavLink>
                        <br/>
                        <NavLink to="/login">Login</NavLink>
                    </Fragment>
                }
            </div>
        );
    }
}

export default UserMenu;