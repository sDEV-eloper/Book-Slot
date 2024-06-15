import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentCalendar = () => {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get('/api/bookings/available-slots');
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleBookSlot = async (slotId) => {
    try {
      await axios.post('/api/bookings/book', { bookingId: slotId });
      fetchAvailability();
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Calendar</h2>
      <div className="flex flex-wrap -mx-2">
        {availability.map((slot) => (
          <div key={slot._id} className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-lg font-semibold">{slot.date}</p>
              <p className="text-gray-700">{slot.timeSlot}</p>
              <button
                className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={() => handleBookSlot(slot._id)}
              >
                Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCalendar;
