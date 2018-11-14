var db = require('../database');
var gaming = {
  getAllGaming: function(callback) {
    return db.query('select * from gaming', callback);
  },
  addGaming: function(gaming, callback) {
    return db.query(
      'insert into gaming values(?, ?)',
      [gaming.ID, gaming.PostID],
      callback
    );
  },
  deleteGaming: function(ID, callback) {
    return db.query('delete from gaming where id=?', [ID], callback);
  },
  updateGaming: function(ID, gaming, callback) {
    return db.query(
      'update gaming set PostID=? where ID=?',
      [gaming.PostID, gaming.ID],
      callback
    );
  }
};
module.exports = gaming;