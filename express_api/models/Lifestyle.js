var db = require('../database');
var lifestyle = {
  getAllLifestyle: function(callback) {
    return db.query('select * from lifestyle', callback);
  },
  addLifestyle: function(lifestyle, callback) {
    return db.query(
      'insert into lifestyle values(?, ?)',
      [lifestyle.ID, lifestyle.PostID],
      callback
    );
  },
  deleteLifestyle: function(ID, callback) {
    return db.query('delete from lifestyle where id=?', [ID], callback);
  },
  updateLifestyle: function(ID, lifestyle, callback) {
    return db.query(
      'update lifestyle set PostID=? where ID=?',
      [lifestyle.PostID, lifestyle.ID],
      callback
    );
  }
};
module.exports = lifestyle;