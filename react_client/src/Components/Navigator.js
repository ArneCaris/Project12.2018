import React, { Component } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { NavLink, LinkContainer, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class Navigator extends Component {
    constructor(props){
        super(props);
        this.getValues = this.getValues.bind(this);
        this.searchData = this.searchData.bind(this);
        this.state = {
          searchUsers: [],
          list: undefined
        };
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
            };            
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
            <div className="navbar">
            <NavLink to="/" id="logo">
              <h2>DiLog</h2>
            </NavLink>
            <CategoryDropdown/>
            <SearchBar search={this.searchData.bind(this)} />
            {(this.state.list) ? <SearchResult searchUsers={this.state.list} /> : null }
            
            <NavLink className="navigation" to="/Users/" />
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

