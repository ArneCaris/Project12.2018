var express = require('express');
var router = express.Router();
var Posts = require('../models/Posts');
router.get('/private', function(req, res, next) {
  Posts.getAllPrivatePosts(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/public', function(req, res, next) {
  Posts.getAllPublicPosts(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/:ID', function(req, res, next){
  if(req.params.ID){
  Posts.getPostsById(req.params.ID, function(err, rows){
    if (err){
      res.json(err);
    }else{
      res.json(rows);
    }
  });
}
});
router.get('/user/:UserID', function(req, res, next){
  if(req.params.UserID){
  Posts.getPostByUserId(req.params.UserID, function(err, rows){
    if(err){
      res.json(err);
    }else{
      res.json(rows);
    }
  });
 }
});
router.get('/category/:Category', function(req, res, next){
  if(req.params.Category){
  Posts.getPostsByCategory(req.params.Category, function(err, rows){
    if (err){
      res.json(err);
    }else{
      res.json(rows);
    }
  });
}
});
router.post('/', function(req, res, next) {
  Posts.addPost(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:id', function(req, res, next) {
  Posts.deletePost(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:id', function(req, res, next) {
  Posts.updatePost(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
