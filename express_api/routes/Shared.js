var express = require('express');
var router = express.Router();
var Shareds = require('../models/Shared');
router.get('/shared/:Viewer', function(req, res, next){
    if(req.params.Viewer){
    Shareds.getSharedPostByViewer(req.params.Viewer, function(err, rows){
      if(err){
        res.json(err);
      }else{
        res.json(rows);
      }
    });
   }
  });
router.get('/shared/:Owner', function(req, res, next){
  if(req.params.Owner){
  Shareds.getSharedPostByOwner(req.params.Owner, function(err, rows){
    if(err){
      res.json(err);
    }else{
      res.json(rows);
    }
  });
 }
});
router.post('/shared/', function(req, res, next) {
  Shareds.addSharedPost(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/shared/:id', function(req, res, next) {
  Shareds.deleteSharedPost(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
module.exports = router;
