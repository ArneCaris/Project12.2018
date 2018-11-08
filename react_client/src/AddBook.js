import React, { Component } from 'react';
import axios from 'axios';

class AddBook extends Component {
    constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        book_id: '',
        book_name: '',
        author: '',
        isbn: ''
    };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleSubmit = event => {
        event.preventDefault();

        const { book_id, book_name, author, isbn } = this.state;
        window.location.reload();

        axios
            .post('http://localhost:3000/books', { book_id, book_name, author, isbn })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };

    render() {
        return (
            <div className="content">
                <h2>Add Book</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    book_id:
                    <input type="number" name="book_id" onChange={this.onChange} />
                    </label>
                    <label>
                    Name:
                    <input type="text" name="book_name" onChange={this.onChange} />
                    </label>
                    <label>
                    Author:
                    <input type="text" name="author" onChange={this.onChange} />
                    </label>
                    <label>
                    ISBN:
                    <input type="text" name="isbn" onChange={this.onChange} />
                    </label>
                    <button className="button" type="submit">
                    Add
                    </button>
                </form>
            </div>
        );
    }
}

export default AddBook;