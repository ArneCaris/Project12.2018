import React, { Component } from 'react';
  import axios from 'axios';
  import ReactTable from 'react-table';
  import 'react-table/react-table.css';

  class BorrowerTable extends Component {
    constructor() {
      super();
      this.showBorrowers = this.showBorrowers.bind(this);
      this.state = {
        tableData: []
      };
      this.showBorrowers();
    }

    showBorrowers() {
      axios.get(`http://localhost:3000/borrowers`).then(response => {
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
                Header: 'All Borrowers',
                columns: [
                  {
                    Header: 'borrower_id',
                    id: 'borrower_id',
                    accessor: d => d.borrower_id
                  },
                  {
                    Header: 'firstname',
                    accessor: 'firstname'
                  },
                  {
                    Header: 'lastname',
                    accessor: 'lastname'
                  },
                  {
                    Header: 'phone',
                    accessor: 'phone'
                  },
                  {
                    Header: 'streetAddress',
                    accessor: 'streetAddress'
                  },
                  {
                    Header: 'postalCode',
                    accessor: 'postalCode'
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

  export default BorrowerTable;