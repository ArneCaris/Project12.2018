import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

<<<<<<< HEAD
  class Home extends Component {
    constructor() {
      super();
      this.showBooks = this.showBooks.bind(this);
      this.state = {
        tableData: []
      };
      this.showBooks();
    }

    showBooks() {
      axios.get(`http://localhost:300s0/book`).then(response => {
        this.setState({ tableData: response.data });
      });
    }
=======
>>>>>>> 5c5a717fc68960840b3aea5d0b7f70434de7d7b2

  class Home extends Component {
    render() {
      

      return (
        <div className="for-posts">
            HOME
        </div>
      );
    }
  }

  export default Home;

