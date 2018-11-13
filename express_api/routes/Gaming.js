var express = require('express');
var router = express.Router();
var gaming = require('../models/Gaming');
router.get('/', function(req, res, next) {
  gaming.getAllGaming(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/', function(req, res, next) {
  gaming.addGaming(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:ID', function(req, res, next) {
  gaming.deleteGaming(req.params.ID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:ID', function(req, res, next) {
  gaming.updateGaming(req.params.ID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;