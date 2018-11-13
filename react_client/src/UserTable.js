import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

  class UserTable extends Component {
    constructor() {
      super();
      this.showUsers = this.showUsers.bind(this);
      this.state = {
        tableData: []
      };
      this.showUsers();
    }

    showUsers() {
      axios.get(`http://localhost:3000/Users`).then(response => {
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
                Header: 'All Users',
                columns: [
                  {
                    Header: 'ID',
                    id: 'ID',
                    accessor: d => d.ID
                  },
                  {
                    Header: 'username',
                    accessor: 'username'
                  },
                  {
                    Header: 'password',
                    accessor: 'password'
                  },
                  
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

  export default UserTable;