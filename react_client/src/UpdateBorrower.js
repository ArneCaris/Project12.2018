import React, { Component } from 'react';
import axios from 'axios';

class UpdateBorrower extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
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

    updateInputValue(val) {
        this.setState({ borrower_id: val.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
        const id = this.state.borrower_id;
        const { firstname, lastname, phone, streetAddress, postalCode } = this.state;
        window.location.reload();

        axios
            .put('http://localhost:3000/borrowers/' + id, {
                firstname,
                lastname,
                phone,
                streetAddress,
                postalCode
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    };

    render() {
        return (
            <div className="content">
                <h2>Update Borrower</h2>
                <label>borrower_id:</label>
                <input
                    type="number" name="borrower_id" onChange={this.updateInputValue} value={this.state.uid} min="1" />
                <form onSubmit={this.handleSubmit}>
                    <label>
                    first name:
                    <input type="text" name="firstname" value={this.state.className}  onChange={this.onChange}/>
                    </label>
                    <label>
                    last name:
                    <input type="text" name="lastname" onChange={this.onChange} />
                    </label>
                    <label>
                    phone:
                    <input type="text" name="phone" onChange={this.onChange} />
                    </label>
                    <label>
                    street address:
                    <input type="text" name="streetAddress" onChange={this.onChange} />
                    </label>
                    <label>
                    postal code:
                    <input type="text" name="postalCode" onChange={this.onChange} />
                    </label>

                    <button className="button" type="submit">
                    Update
                    </button>
                </form>
            </div>
        );
    }
}

export default UpdateBorrower;