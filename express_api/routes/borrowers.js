var express = require('express');
var router = express.Router();
var borrowers = require('../models/borrowers');
router.get('/:borrower_id?', function(req, res, next) {
  if (req.params.borrower_id) {
    borrowers.getborrowerByborrower_id(req.params.borrower_id, function(
      err,
      rows
    ) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    borrowers.getAllborrowers(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  borrowers.addborrower(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:borrower_id', function(req, res, next) {
  borrowers.deleteborrower(req.params.borrower_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:borrower_id', function(req, res, next) {
  borrowers.updateborrower(req.params.borrower_id, req.body, function(
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
