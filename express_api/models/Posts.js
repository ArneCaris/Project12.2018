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
  getPrivatePostByUserId(UserID, callback){
    return db.query('select * from post where UserID=? AND isPrivate=1', [UserID], callback);
  },
  getPostsByCategory: function(Category, callback) {
    return db.query('select * from post where Category=? AND isPrivate=0', [Category], callback);
  },
  addPost: function(post, callback) {
    return db.query(
      'insert into post values(?,?,?,?,?,?)',
      [post.ID, post.UserID, post.Title, post.Content, post.Category, post.isPrivate],
      callback
    );
  },
  deletePost: function(id, callback) {
    return db.query('delete from post where id=?', [id], callback);
  },
  updatePost: function(ID, post, callback) {
    return db.query(
      'update post set Title=?,Content=?,isPrivate=?, Category=? where ID=?',
      [post.Title, post.Content, post.isPrivate, post.Category, ID],
      callback
    );
  }
};
module.exports = Posts;
