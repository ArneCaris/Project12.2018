import React, { Component } from 'react';
import axios from 'axios';

class UpdateBook extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.state = {
            book_id: 1,
            book_name: '',
            author: '',
            isbn:''
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    updateInputValue(val) {
        this.setState({ book_id: val.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
        const id = this.state.book_id;
        const { book_name, author, isbn } = this.state;
        window.location.reload();

        axios
            .put('http://localhost:3000/books/' + id, {
                book_name,
                author,
                isbn
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    };

    render() {
        return (
            <div className="content">
                <h2>Update Book</h2>
                <label>book_id:</label>
                <input
                    type="number" name="book_id" onChange={this.updateInputValue} value={this.state.uid} min="1" max="20" />
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Name:
                    <input type="text" name="book_name" value={this.state.className}  onChange={this.onChange}/>
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
                    Update
                    </button>
                </form>
            </div>
        );
    }
}

export default UpdateBook;