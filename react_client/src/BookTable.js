import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

  class BookTable extends Component {
    constructor() {
      super();
      this.showBooks = this.showBooks.bind(this);
      this.state = {
        tableData: []
      };
      this.showBooks();
    }

    showBooks() {
      axios.get(`http://localhost:3000/books`).then(response => {
        this.setState({ tableData: response.data });
      });
    }

    render() {
      const { tableData } = this.state;

      return (
        <div className="content">
          
          <ReactTable
            data={tableData}
            columns={[
              {
                Header: 'All Books',
                columns: [
                  {
                    Header: 'book_id',
                    id: 'book_id',
                    accessor: d => d.book_id
                  },
                  {
                    Header: 'book_name',
                    accessor: 'book_name'
                  },
                  {
                    Header: 'author',
                    accessor: 'author'
                  },
                  {
                    Header: 'isbn',
                    accessor: 'isbn'
                  }
                ]
              }
            ]}
            defaultPageSize={3}
            className="-striped -highlight"
          />
        </div>
      );
    }
  }

  export default BookTable;