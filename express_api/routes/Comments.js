var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
router.get('/:PostID?', function(req, res, next) {
  if (req.params.PostID) {
    comments.getCommentsByPostId(req.params.PostID, function(
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
router.delete('/delete/:id', function(req, res, next) {
  comments.deleteComment(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/edit/:ID', function(req, res, next) {
  comments.updateComment(req.params.ID, req.body, function(
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
