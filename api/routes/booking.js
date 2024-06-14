import express from 'express';
import Booking from '../models/Booking.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// View available slots
router.get('/slots', authMiddleware, async (req, res) => {
  try {
    const slots = await Booking.find({ status: 'available' }).populate('adminId', 'username');
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book a slot
router.post('/book', authMiddleware, async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Slot not found' });

    // Check if the student already booked a slot on the same day
    const existingBooking = await Booking.findOne({
      studentId: req.user.userId,
      date: booking.date
    });
    if (existingBooking) return res.status(400).json({ message: 'You have already booked a slot on this day' });

    booking.studentId = req.user.userId;
    booking.status = 'booked';
    await booking.save();
    res.json({ message: 'Slot booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View student bookings
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user.userId }).populate('adminId', 'username');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
