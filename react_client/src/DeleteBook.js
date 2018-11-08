import React, { Component } from 'react';
import axios from 'axios';

class DeleteBook extends Component {
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
        const id = this.state.book_id;
        const { book_id, book_name, author, isbn } = this.state;
        window.location.reload();

        axios
            .delete('http://localhost:3000/books/' + id, { book_id, book_name, author, isbn })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };

    render() {
        return (
            <div className="content">
                <h2>Delete Book</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    book_id:
                    <input type="number" name="book_id" onChange={this.onChange} />
                    </label>
                    <button className="button" type="submit">
                    Delete
                    </button>
                </form>
            </div>
        );
    }
}

export default DeleteBook;