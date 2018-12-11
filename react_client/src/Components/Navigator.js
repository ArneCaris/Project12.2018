import React, { Component, Fragment } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
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
    constructor(props){
        super(props);
        this.getValues = this.getValues.bind(this);
        this.searchData = this.searchData.bind(this);
        this.toggleDD = this.toggleDD.bind(this);
        this.state = {
          searchUsers: [],
          list: undefined,
          isDDopen: false
        };
    }



    toggleDD() {
      this.setState({
        isDDopen: !this.state.isDDopen
      });
    }

    searchData(e) {
        var queryData = [];
        this.getValues();
        if (e.target.value !== '') {
          this.state.searchUsers.forEach(function(person){
            if (person.toString().toLowerCase().indexOf(e.target.value)!== -1) {
              if (queryData.length < 100) {
                queryData.push(person);              
              }              
            }
          });          
        }
        this.setState({list: queryData});
        console.log(queryData[1])
      }

      getValues() {
        axios.get('http://localhost:3000/Users').then(res => {
          const searchUsers = res.data;
          this.setState({ searchUsers })
          const var1 = this.state.searchUsers.map(user => (user.username));
          console.log(var1) 
          
        })
      }

    render() {
        return (
            <div>
            <Navbar color="light" light expand="md">
              <NavLink to="/" style={{ textDecoration: 'none', color: 'black', fontStyle: 'italic' }}>
                  <h3>DiLog</h3>
              </NavLink>
              <CategoryDropdown/>
              <SearchBar search={this.searchData.bind(this)} />
              {(this.state.list) ? <SearchResult searchUsers={this.state.list} /> : null }
              <NavLink className="navigation" to="/Users/" />
              {sessionStorage.length !== 0
              ? 
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Posts
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink className="navigation" to="/CreatePost">
                    Create Post
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="navigation" to="/">
                    View Posts
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="navigation" to="/posts/private">
                    View Private Posts
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="navigation" to="/shared/mine">
                    View my shared posts
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="navigation" to="/comments">
                    View comments
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="navigation" to="/EditPost">
                    edit post
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/Post/Delete">
                    Delete Post
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="navigation" to="/ShareEntry">
                    Share with
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/close_account">
                    Close Account
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
              :
              <div>Not logged in</div>
              }
            </Navbar>
        </div>
        );
    }
}

class SearchBar extends React.Component {
    render () {
      return(
        <div >
          <input onChange={this.props.search} placeholder="Search users" />
        </div>
      )
    }
  }

  class SearchResult extends React.Component {
    render () {
      return(
        <div>
          <ul>
            {this.props.searchUsers.map(function(value) {
              return <Item key={value} val={value} />
            })}
          </ul>
        </div>
      )
    }
  }

  class Item extends React.Component {
    render() {
      return(
        <li>
          {this.props.val}
        </li>
      )
    }
  }
export default Navigator;

