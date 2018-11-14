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
      [post.ID, post.UserID, post.Title, post.Content, post.WhenPosted, post.isPrivate],
      callback
    );
  },
  deletePost: function(id, callback) {
    return db.query('delete from post where id=?', [id], callback);
  },
  updatePost: function(id, post, callback) {
    return db.query(
      'update post set title=?,content=?,whenposted=?,isprivate=? where id=?',
      [post.title, post.content,post.whenposted, post.isprivate, id],
      callback
    );
  }
};
module.exports = Posts;
