var express = require('express');
var router = express.Router();
var books = require('../models/books');
router.get('/:book_id?', function(req, res, next) {
  if (req.params.book_id) {
    books.getbookBybook_id(req.params.book_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    books.getAllbooks(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  books.addbook(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:book_id', function(req, res, next) {
  books.deletebook(req.params.book_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:book_id', function(req, res, next) {
  books.updatebook(req.params.book_id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
