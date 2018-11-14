var db = require('../database');
var comments = {
  getCommentsByPostId: function(PostID, callback) {
    return db.query(
      'select * from comments where PostID=?',
      [PostID],
      callback
    );
  },
  addComment: function(comments, callback) {
    return db.query(
      'insert into comments values(?,?,?,?,?)',
      [
        comments.ID,
        comments.PostID,
        comments.UserID,
        comments.Message,
        comments.LastEdit
      ],
      callback
    );
  },
  deleteComment: function(id, callback) {
    return db.query(
      'delete from comments where id=?',
      [id],
      callback
    );
  },
  updateComment: function(ID, comments, callback) {
    return db.query(
      'update comments set Message=? where ID=?',
      [ comments.Message, ID ],
      callback
    );
  }
};
module.exports = comments;
