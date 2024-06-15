import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  adminId: { type: String, ref: 'User' },
  studentId: { type: String, ref: 'User' }, // make it optional
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, default: 'available' }, // 'booked', 'available'
});

export default mongoose.model('Booking', bookingSchema);
