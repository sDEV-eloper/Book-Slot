import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.post('/api/bookings/cancel', { bookingId });
      fetchBookings();
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
     </div>
  )
}


export default Bookings;