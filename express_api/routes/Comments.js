var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
router.get('/:PostId?', function(req, res, next) {
  if (req.params.PostID) {
    borrowers.getCommentsByPostId(req.params.PostID, function(
      err,
      rows
    ) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  comments.addComment(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:id', function(req, res, next) {
  comments.deleteComment(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:id', function(req, res, next) {
  comments.updateComment(req.params.id, req.body, function(
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
