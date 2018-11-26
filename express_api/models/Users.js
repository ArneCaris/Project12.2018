var db = require('../database');
var users = {
  getAllUsers: function(callback) {
    return db.query('select * from user', callback);
  },
  getUserByUsername: function(username, callback) {
    return db.query('select * from user where username=?', [username], callback);
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