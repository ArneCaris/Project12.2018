var db = require('../database');
var books = {
  getAllbooks: function(callback) {
    return db.query('select * from books', callback);
  },
  getbookBybook_id: function(book_id, callback) {
    return db.query('select * from books where book_id=?', [book_id], callback);
  },
  addbook: function(books, callback) {
    return db.query(
      'insert into books values(?,?,?,?)',
      [books.book_id, books.book_name, books.author, books.isbn],
      callback
    );
  },
  deletebook: function(book_id, callback) {
    return db.query('delete from books where book_id=?', [book_id], callback);
  },
  updatebook: function(book_id, books, callback) {
    return db.query(
      'update books set book_name=?,author=?, isbn=? where book_id=?',
      [books.book_name, books.author, books.isbn, book_id],
      callback
    );
  }
};
module.exports = books;
