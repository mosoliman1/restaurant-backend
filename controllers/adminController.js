// controllers/adminController.js
const Reservation = require('../models/reservationModel');
const Schedule = require('../models/scheduleModel');
const db = require('../db');

exports.viewAllReservations = (req, res) => {
  Reservation.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        errorCode: 'SERVER_ERROR'
      });
    }

    return res.json({
      success: true,
      data: rows.map((r) => ({
        reservationId: r.reservationId,
        userId: r.userId,
        restaurantId: r.restaurantId,
        date: r.date,
        time: r.time,
        guests: r.guests,
        status: r.status
      }))
    });
  });
};

exports.decisionReservation = (req, res) => {
  const reservationId = req.params.id;
  const { status } = req.body; // 'accepted' or 'declined'

  Reservation.changeStatus(reservationId, status, (err) => {
    if (err) {
      if (err.message === 'NOT_FOUND') {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          errorCode: 'RESERVATION_NOT_FOUND'
        });
      }
      return res.status(500).json({
        success: false,
        statusCode: 500,
        errorCode: 'SERVER_ERROR'
      });
    }

    return res.json({
      success: true,
      message: 'Status updated',
      data: {
        reservationId: Number(reservationId),
        newStatus: status
      }
    });
  });
};

exports.updateTables = (req, res) => {
  const { restaurantId, tablesAvailable } = req.body;

  if (!restaurantId || typeof tablesAvailable !== 'number') {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      errorCode: 'INVALID_DATA'
    });
  }

  db.serialize(() => {
    db.run(
      'DELETE FROM tables WHERE restaurantId = ?',
      [restaurantId],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            statusCode: 500,
            errorCode: 'SERVER_ERROR'
          });
        }

        const stmt = db.prepare(
          'INSERT INTO tables (restaurantId, capacity, status) VALUES (?, ?, "available")'
        );
        for (let i = 0; i < tablesAvailable; i++) {
          stmt.run([restaurantId, 4]);
        }
        stmt.finalize((err2) => {
          if (err2) {
            return res.status(500).json({
              success: false,
              statusCode: 500,
              errorCode: 'SERVER_ERROR'
            });
          }

          return res.json({
            success: true,
            message: 'Tables updated'
          });
        });
      }
    );
  });
};

exports.updateSchedule = (req, res) => {
  const { restaurantId, closedTimes } = req.body;

  if (!restaurantId || !Array.isArray(closedTimes)) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      errorCode: 'INVALID_TIME'
    });
  }

  Schedule.updateSchedule(restaurantId, closedTimes, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        errorCode: 'INVALID_TIME'
      });
    }

    return res.json({
      success: true,
      message: 'Schedule updated'
    });
  });
};
