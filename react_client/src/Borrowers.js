import React, { Component } from 'react';
import axios from 'axios';

class Borrowers extends Component {
    constructor() {
        super();
        this.getborrowers = this.getborrowers.bind(this);
        this.state = {
            borrowers: []
        };
    }
    getborrowers() {
        axios.get(`http://localhost:3000/borrowers`).then(res => {
            const borrowers = res.data;
            this.setState({ borrowers });
        });
    }

    render() {
        return (
            <div>
                <button className="button" onClick={this.getborrowers}>
                Show borrowers
                </button>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>borrower_id</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>phone</th>
                        <th>streetAddress</th>
                        <th>postalCode</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.borrowers.map(borrowers => (
                        <tr key={borrowers.borrower_id}>
                        <td>{borrowers.borrower_id}</td>
                        <td>{borrowers.firstname}</td>
                        <td>{borrowers.lastname}</td>
                        <td>{borrowers.phone}</td>
                        <td>{borrowers.streetAddress}</td>
                        <td>{borrowers.postalCode}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Borrowers;