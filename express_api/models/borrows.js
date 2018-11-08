var db = require('../database');
var borrows = {
  getAllborrows: function(callback) {
    return db.query(
      'select firstname,lastname,book_name,borrow_date,return_date from borrows inner join books ON borrows.book_id=books.book_id INNER JOIN borrowers ON borrows.borrower_id=borrowers.borrower_id',
      callback
    );
  },
  getborrowByborrow_id: function(borrow_id, callback) {
    return db.query(
      'select firstname,lastname,book_name,borrow_date,return_date from borrows inner join books ON borrows.book_id=books.book_id INNER JOIN borrowers ON borrows.borrower_id=borrowers.borrower_id where borrows.book_id=?',
      [borrow_id],
      callback
    );
  },
  addborrow: function(borrows, callback) {
    return db.query(
      'insert into borrows values(?,?,?,?)',
      [
        borrows.book_id,
        borrows.borrower_id,
        borrows.borrow_date,
        borrows.return_date
      ],
      callback
    );
  },
  deleteborrow: function(book_id, callback) {
    return db.query('delete from borrows where book_id=?', [book_id], callback);
  },
  updateborrow: function(book_id, borrows, callback) {
    return db.query(
      'update borrows set borrower_id=?, borrow_date=?, return_date=? where book_id=?',
      [borrows.borrower_id, borrows.borrow_date, borrows.return_date, book_id],
      callback
    );
  }
};
module.exports = borrows;
