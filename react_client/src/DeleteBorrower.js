import React, { Component } from 'react';
import axios from 'axios';

class DeleteBorrower extends Component {
    constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        borrower_id: '',
        firstname: '',
        lastname: '',
        phone: '',
        streetAddress: '',
        postalCode: ''
    };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();
        const id = this.state.borrower_id;
        const { firstname, lastname, phone, streetAddress, postalCode } = this.state;
        window.location.reload();

        axios
            .delete('http://localhost:3000/borrowers/' + id, { firstname, lastname, phone, streetAddress, postalCode })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };

    render() {
        return (
            <div className="content">
                <h2>Delete Borrower</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    borrower_id:
                    <input type="number" name="borrower_id" onChange={this.onChange} />
                    </label>
                    <button className="button" type="submit">
                    Delete
                    </button>
                </form>
            </div>
        );
    }
}

export default DeleteBorrower;