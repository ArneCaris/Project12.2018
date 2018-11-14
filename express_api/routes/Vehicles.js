var express = require('express');
var router = express.Router();
var Vehicles = require('../models/Vehicles');
router.get('/', function(req, res, next) {
  Vehicles.getAllVehicles(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/', function(req, res, next) {
  Vehicles.addVehicle(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:ID', function(req, res, next) {
  Vehicles.deleteVehicle(req.params.ID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:ID', function(req, res, next) {
  Vehicles.updateVehicle(req.params.ID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;