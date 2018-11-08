import React, { Component } from 'react';
  import axios from 'axios';

  class Books extends Component {
    constructor() {
      super();
      this.getBooks = this.getBooks.bind(this);
      this.state = {
        books: []
      };
    }
    getBooks() {
      axios.get(`http://localhost:3000/books`).then(res => {
        const books = res.data;
        this.setState({ books });
      });
    }

    render() {
      return (
        <div>
          <button className="button" onClick={this.getBooks}>
            Show books
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>book_id</th>
                <th>book_name</th>
                <th>author</th>
                <th>isbn</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map(book => (
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td> {book.book_name}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  export default Books;