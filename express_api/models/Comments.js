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
        comments.id,
        comments.PostID,
        comments.UserID,
        comments.Message,
        comments.TIMESTAMP
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
  updateComment: function(id, comments, callback) {
    return db.query(
      'update comments set PostID=?,UserID=?, Message=?, where id=?',
      [
        comments.PostID,
        comments.UserID,
        comments.Message,
        id
      ],
      callback
    );
  }
};
module.exports = comments;
