// models/restaurantModel.js
const db = require('../db');

const Restaurant = {
  getAll(callback) {
    db.all(
      'SELECT restaurantId AS id, name, location FROM restaurants',
      [],
      callback
    );
  },

  findById(id, callback) {
    db.get(
      'SELECT * FROM restaurants WHERE restaurantId = ?',
      [id],
      callback
    );
  }
};

module.exports = Restaurant;
