import express from 'express';
import Booking from '../models/Booking.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Create availability slots
router.post('/slots', authMiddleware, adminMiddleware, async (req, res) => {
  const { date, timeSlots } = req.body;
  try {
    const slots = timeSlots.map(timeSlot => ({
      adminId: req.user.userId,
      date,
      timeSlot,
      status: 'available'
    }));
    await Booking.insertMany(slots);
    res.status(201).json({ message: 'Slots created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View bookings
router.get('/bookings', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ adminId: req.user.userId }).populate('studentId', 'username');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
