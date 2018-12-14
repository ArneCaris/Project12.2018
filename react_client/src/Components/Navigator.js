import React, { Component, Fragment } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Navigator extends Component {

    render() {
        return (
            <div>
            <Navbar expand="md" className="navi-bar">
              <NavLink to="/" className="title-text">
                  <h3><i><b>Di</b>Log</i></h3>
              </NavLink>
             
              <CategoryDropdown/>

              {sessionStorage.length !== 0
              ?<p></p>
              :
              <div className="signin">
                  <NavLink to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faSignInAlt}/> Sign-in
                  </NavLink>
              </div>
              }


                
              
            </Navbar>
            
        </div>
        );
    }
}


export default Navigator;

