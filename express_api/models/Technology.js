var db = require('../database');
var technology = {
  getAllTechnologies: function(callback) {
    return db.query('select * from technology', callback);
  },
  addTechnology: function(technology, callback) {
    return db.query(
      'insert into technology values(?, ?)',
      [technology.ID, technology.PostID],
      callback
    );
  },
  deleteTechnology: function(ID, callback) {
    return db.query('delete from technology where id=?', [ID], callback);
  },
  updateTechnology: function(ID, technology, callback) {
    return db.query(
      'update technology set PostID=? where ID=?',
      [technology.PostID, technology.ID],
      callback
    );
  }
};
module.exports = technology;