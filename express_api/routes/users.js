var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
router.get('/:username?', function(req, res, next) {
  if (req.params.username) {
    Users.getUserByUsername(req.params.username, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  Users.addUser(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:ID', function(req, res, next) {
  Users.deleteUser(req.params.ID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
module.exports = router;