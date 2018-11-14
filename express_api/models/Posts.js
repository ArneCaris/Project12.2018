var db = require('../database');
var Posts = {
  getAllPublicPosts: function(callback) {
    return db.query('select * from post where isPrivate=0', callback);
  },
  getAllPrivatePosts: function(callback) {
    return db.query('select * from post where isPrivate=1', callback);
  },
  getPostsById: function(ID, callback){
    return db.query('select * from post where ID=?',[ID], callback);
  },
  getPostByUserId(UserID, callback){
    return db.query('select * from post where UserID=?', [UserID], callback);
  },
  addPost: function(post, callback) {
    return db.query(
      'insert into post values(?,?,?,?,?,?)',
      [post.ID, post.UserID, post.Title, post.Content, post.isPrivate, post.LastEdit],
      callback
    );
  },
  deletePost: function(id, callback) {
    return db.query('delete from post where id=?', [id], callback);
  },
  updatePost: function(ID, post, callback) {
    return db.query(
      'update post set UserID=?,Title=?,Content=?,WhenPosted=?,isPrivate=? where ID=?',
      [post.UserID, post.Title, post.Content,post.WhenPosted, post.isPrivate, ID],
      callback
    );
  }
};
module.exports = Posts;
