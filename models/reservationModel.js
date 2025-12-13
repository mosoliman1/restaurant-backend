// models/reservationModel.js
const db = require('../db');

const Reservation = {
  getByUser(userId, callback) {
  const sql = `
    SELECT
      r.reservationId,
      r.date,
      r.time,
      r.guests,
      r.status,
      res.restaurantId,
      res.name AS restaurantName,
      res.location AS restaurantLocation
    FROM reservations r
    JOIN restaurants res ON res.restaurantId = r.restaurantId
    WHERE r.userId = ?
      AND (r.status IS NULL OR r.status != 'cancelled')
    ORDER BY r.date DESC, r.time DESC
  `;
  db.all(sql, [userId], callback);
},


  create({ userId, restaurantId, date, time, guests }, callback) {
    const sql = `
      INSERT INTO reservations (userId, restaurantId, date, time, guests)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [userId, restaurantId, date, time, guests], function (err) {
      if (err) return callback(err);
      callback(null, { reservationId: this.lastID });
    });
  },

  update(reservationId, { date, time }, userId, callback) {
    const sql = `
      UPDATE reservations
      SET date = ?, time = ?
      WHERE reservationId = ? AND userId = ?
    `;
    db.run(sql, [date, time, reservationId, userId], function (err) {
      if (err) return callback(err);
      if (this.changes === 0) {
        return callback(new Error('NOT_FOUND'));
      }
      callback(null);
    });
  },

  cancel(reservationId, userId, callback) {
    const sql = `
      UPDATE reservations
      SET status = 'cancelled'
      WHERE reservationId = ? AND userId = ?
    `;
    db.run(sql, [reservationId, userId], function (err) {
      if (err) return callback(err);
      if (this.changes === 0) {
        return callback(new Error('NOT_FOUND'));
      }
      callback(null);
    });
  },

  getAll(callback) {
    db.all('SELECT * FROM reservations', [], callback);
  },

  changeStatus(reservationId, status, callback) {
    const sql = `
      UPDATE reservations
      SET status = ?
      WHERE reservationId = ?
    `;
    db.run(sql, [status, reservationId], function (err) {
      if (err) return callback(err);
      if (this.changes === 0) {
        return callback(new Error('NOT_FOUND'));
      }
      callback(null);
    });
  }
};

module.exports = Reservation;
