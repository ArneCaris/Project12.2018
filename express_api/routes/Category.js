var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
router.get('/:Category', function(req, res, next){
    if(req.params.Category){
    Category.getPostsByCategory(req.params.Category, function(err, rows){
      if (err){
        res.json(err);
      }else{
        res.json(rows);
      }
    });
  }
});
module.exports = router;