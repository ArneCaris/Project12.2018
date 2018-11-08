import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BookTable from './BookTable';
import Home from './Home';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';
import BorrowerTable from './BorrowerTable';
import AddBorrower from './AddBorrower';
import UpdateBorrower from './UpdateBorrower';
import DeleteBorrower from './DeleteBorrower';
import { NavLink, Route } from 'react-router-dom';
require("react-bootstrap/lib/NavbarHeader");
require("react-bootstrap/lib/NavbarBrand")



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar">
            <h1>Menu</h1>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/books">
              Books
            </NavLink>
            <NavLink to="/borrowers">
              Borrowers
            </NavLink>
            <br/>
            
        </div>
        <div className="books-crud">
          <NavLink to="/books/add">
              Add Book
          </NavLink>
          <NavLink to="/books/update">
              Update Book
          </NavLink>
          <NavLink to="/books/delete">
              Delete Book
          </NavLink>
        </div>
        <Route path="/" exact component={Home} />

        <Route path="/books/add" exact component={AddBook} /> 
        <Route path="/books/update" exact component={UpdateBook} />
        <Route path="/books/delete" exact component={DeleteBook} />
        <Route path="/books" exact component={BookTable} /> 
        
        {/*<Route path="/borrowers" exact component={AddBorrower} /> 
        <Route path="/borrowers" exact component={UpdateBorrower} /> 
  <Route path="/borrowers" exact component={DeleteBorrower} />*/} 
        <Route path="/borrowers" exact component={BorrowerTable} /> 
      </div>
      
    );
  }
}

export default App;
