var express = require('express');
var router = express.Router();
var borrows = require('../models/borrows');
router.get('/:borrow_id?', function(req, res, next) {
  if (req.params.borrow_id) {
    borrows.getborrowByborrow_id(req.params.borrow_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    borrows.getAllborrows(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  borrows.addborrow(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:book_id', function(req, res, next) {
  borrows.deleteborrow(req.params.book_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:book_id', function(req, res, next) {
  borrows.updateborrow(req.params.book_id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
