import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, default: 'available' }, // 'booked', 'available'
});

export default mongoose.model('Booking', bookingSchema);
