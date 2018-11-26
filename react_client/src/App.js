import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import Posts from './Posts';
import Login from './Login';
import ShareEntry from './ShareEntry';
import EditPost from './EditPost';
import test from './test';
import ViewPost from './ViewPost';
import { NavLink, Route } from 'react-router-dom';



import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand");


class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isOpen: false,
      data: [],
      list: undefined
    }
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  componentDidMount() {
    
      
  }

  searchData(e) {
    var queryData = [];
    if (e.target.value != '') {
      this.state.data.forEach(function(person){
        if (person.toLowerCase().indexOf(e.target.value)!=-1) {
          if (queryData.length < 10) {
            queryData.push(person);
          }
        }
      });
    }
    this.setState({list: queryData});
  }
  render () {

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <div className="App">
        <div className="navbar">
            
            <NavLink to="/" id="logo">
              <h2>DiLog</h2>
            </NavLink>

            <div className="dropdown" onClick={this.toggleOpen}>
                <button 
                    className="btn btn-secondary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true"
                    >
                    Categories
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#nogo">Lifestyle</a>
                    <a className="dropdown-item" href="#nogo">Gaming</a>
                    <a className="dropdown-item" href="#nogo">Technology</a>
                    <a className="dropdown-item" href="#nogo">Vehicles</a>
                </div>

        </div>
              
              <Searching search={this.searchData.bind(this)} />
              {(this.state.list) ? <SearchResult data={this.state.list} /> : null }

              <NavLink className="navigation" to="/Users/" />
        </div>
        
        
        <hr/>

      
      <div>
              <NavLink className="navigation" to="/Posts/View">
                herefortesting
              </NavLink>
              <NavLink to="/Users/">
                Users
              </NavLink>
              <NavLink className="navigation" to="/CreatePost">
                Create Post
              </NavLink>
              <NavLink className="navigation" to="/Post">
                View Posts
              </NavLink>
              <NavLink className="navigation" to="/EditPost">
                edit post
              </NavLink>
              <NavLink to="/Users/delete">
                  Delete User
              </NavLink>
              <NavLink to="/test">
                  test
              </NavLink>
              <br/>
              <NavLink className="navigation" to="/ShareEntry">
                Share with
              </NavLink>
              <br/>
 
            <div className="userLogin">
                <NavLink to="/Users/add">
                  Add User
                </NavLink>
                <br/>
                <NavLink to="/Users/delete">
                  Delete User
                </NavLink>
            </div>

        <Route path="/test" exact component={test} />
        <Route path="/createpost" exact component={CreatePost} />
        <Route path="/Posts" exact component={Posts} />
        <Route path="/Posts/View" exact component={ViewPost} />
        <Route path="/deletepost" exact component={DeletePost} />
        <Route path="/editpost" exact component={EditPost} />
        <Route path="/Users/" exact component={Users} /> 
        <Route path="/Users/add" exact component={AddUser} />
        <Route path="/Users/delete" exact component={DeleteUser} />
        <Route path="/login" exact component={Login} />
        <Route path="/ShareEntry" exact component={ShareEntry} />
        <Route path="/login" exact component={Login} />

      </div>
      </div>
    )
  }
}

class Searching extends React.Component {
  render () {
    return(
      <div>
        <input onChange={this.props.search} placeholder="Search Pokemon" />
      </div>
    )
  }
}
class SearchResult extends React.Component {
  render () {
    return(
      <div>
        <ul>
          {this.props.data.map(function(value) {
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

export default App;
