// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.put('/:id', authMiddleware, reservationController.modifyReservation);
router.delete('/:id', authMiddleware, reservationController.cancelReservation);

module.exports = router;
