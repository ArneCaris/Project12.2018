var db = require('../database');
var borrowers = {
  getAllborrowers: function(callback) {
    return db.query('select * from borrowers', callback);
  },
  getborrowerByborrower_id: function(borrower_id, callback) {
    return db.query(
      'select * from borrowers where borrower_id=?',
      [borrower_id],
      callback
    );
  },
  addborrower: function(borrowers, callback) {
    return db.query(
      'insert into borrowers values(?,?,?,?,?,?)',
      [
        borrowers.borrower_id,
        borrowers.firstname,
        borrowers.lastname,
        borrowers.phone,
        borrowers.streetAddress,
        borrowers.postalCode
      ],
      callback
    );
  },
  deleteborrower: function(borrower_id, callback) {
    return db.query(
      'delete from borrowers where borrower_id=?',
      [borrower_id],
      callback
    );
  },
  updateborrower: function(borrower_id, borrowers, callback) {
    return db.query(
      'update borrowers set firstname=?,lastname=?, phone=?, streetAddress=?, postalCode=? where borrower_id=?',
      [
        borrowers.firstname,
        borrowers.lastname,
        borrowers.phone,
        borrowers.streetAddress,
        borrowers.postalCode,
        borrower_id
      ],
      callback
    );
  }
};
module.exports = borrowers;
