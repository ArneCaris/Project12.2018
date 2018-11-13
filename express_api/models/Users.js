var db = require('../database');
var users = {
  getUserById: function(ID, callback) {
    return db.query('select * from user where id=?', [ID], callback);
  },
  addUser: function(user, callback) {
    return db.query(
      'insert into user values(?,?,?)',
      [user.ID, user.username, user.password],
      callback
    );
  },
  deleteUser: function(ID, callback) {
    return db.query('delete from user where id=?', [ID], callback);
  }
};
module.exports = users;