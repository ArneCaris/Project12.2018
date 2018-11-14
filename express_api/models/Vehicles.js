var db = require('../database');
var vehicles = {
  getAllVehicles: function(callback) {
    return db.query('select * from vehicles', callback);
  },
  addVehicle: function(vehicles, callback) {
    return db.query(
      'insert into vehicles values(?, ?)',
      [vehicles.ID, vehicles.PostID],
      callback
    );
  },
  deleteVehicle: function(ID, callback) {
    return db.query('delete from vehicles where id=?', [ID], callback);
  },
  updateVehicle: function(ID, vehicles, callback) {
    return db.query(
      'update vehicles set PostID=? where ID=?',
      [vehicles.PostID, vehicles.ID],
      callback
    );
  }
};
module.exports = vehicles;