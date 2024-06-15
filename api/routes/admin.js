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

// Get availability slots for admins
router.get('/availability', authMiddleware,  adminMiddleware, async (req, res) => {
  try {
    const slots = await Booking.find({ adminId: req.user._id });
    console.log({slots})
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new availability slot
router.post('/add-slot', authMiddleware, adminMiddleware, async (req, res) => {
  const { date, timeSlot } = req.body;
  try {
    const newSlot = new Booking({
      adminId: req.user._id,
      date,
      timeSlot,
      status: 'available'
    });
    console.log({newSlot})
    await newSlot.save();
    res.status(201).json({ message: 'Slot added successfully', slot: newSlot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
