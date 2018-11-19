import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

    render() {
      const { tableData } = this.state;

      return (
        <div className="content">
          <h2>React.js application</h2>
          <h5>Using Express and importing a MySQL Database</h5>
        </div>
      );
    }
  }

  export default Home;

