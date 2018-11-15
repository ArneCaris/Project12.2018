var db = require('../database');
var Shared = {
  getSharedPostByViewer: function(Viewer, callback) {
    return db.query('select * from sharedpost where Viewer=?',
    [Viewer], callback);
  },
  getSharedPostByOwner: function(Owner, callback) {
    return db.query('select * from sharedpost where Owner=?',
    [Owner], callback);
  },
  addSharedPost: function(sharedpost, callback) {
    return db.query(
        'insert into sharedpost values (?,?,?,?)',
        [sharedpost.ID, sharedpost.PostID, sharedpost.Owner,
         sharedpost.Viewer], callback);
  },
  deleteSharedPost(ID, callback){
    return db.query('delete from sharedpost where ID=?',
    [ID], callback);
  },
};
module.exports = Shared;