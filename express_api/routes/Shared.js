var express = require('express');
var router = express.Router();
var Shared = require('../models/Shared');
router.get('/with/:Viewer', function(req, res, next){
    if(req.params.Viewer){
    Shared.getSharedPostByViewer(req.params.Viewer,
      function(err, rows){
      if(err){
        res.json(err);
      }else{
        res.json(rows);
      }
    });
   }
  });
router.get('/mine/:Owner', function(req, res, next){
  if(req.params.Owner){
  Shared.getSharedPostByOwner(req.params.Owner, function(err, rows){
    if(err){
      res.json(err);
    }else{
      res.json(rows);
    }
  });
 }
});
router.post('/', function(req, res, next) {
  Shared.addSharedPost(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:id', function(req, res, next) {
  Shared.deleteSharedPost(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
module.exports = router;
