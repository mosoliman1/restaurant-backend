require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const db = require('./db'); // initializes the database

// ROUTES (we will create these files later)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors({
  origin: 'http://localhost:5173', // you can change it later to your frontend
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Restaurant backend running' });
});

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes); // for /admin/reservations like ms3

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
