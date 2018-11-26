var db = require('../database');
var category = {
  getPostsByCategory: function(Category, callback) {
    return db.query('select * from post where Category=? AND isPrivate=0', [Category], callback);
  },
};
module.exports = category;