var express = require('express');
var router = express.Router();
var lifestyle = require('../models/Lifestyle');
router.get('/', function(req, res, next) {
  lifestyle.getAllLifestyle(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/', function(req, res, next) {
  lifestyle.addLifestyle(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:ID', function(req, res, next) {
  lifestyle.deleteLifestyle(req.params.ID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:ID', function(req, res, next) {
  lifestyle.updateLifestyle(req.params.ID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;