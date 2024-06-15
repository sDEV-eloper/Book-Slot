import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'

const AdminCalendar = () => {
  const [availability, setAvailability] = useState([]);
  const user=useSelector((state)=>state.auth.user)
  const [newSlot, setNewSlot] = useState({ date: '', timeSlot: '' });
  const authToken = user.token

 
  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get('/api/admin/availability', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("res===", response.data);
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleAddSlot = async () => {
    try {
      await axios.post('/api/admin/add-slot', newSlot, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNewSlot({ date: '', timeSlot: '' });
      fetchAvailability(); // Refresh availability after adding a slot
    } catch (error) {
      console.error('Error adding slot:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Calendar</h2>
      <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
        <h3 className="text-xl font-semibold mb-2">Add New Slot</h3>
        <div className="mb-4">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            className="border rounded w-full p-2"
            value={newSlot.date}
            onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Time Slot</label>
          <input
            type="time"
            className="border rounded w-full p-2"
            value={newSlot.timeSlot}
            onChange={(e) => setNewSlot({ ...newSlot, timeSlot: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleAddSlot}
        >
          Add Slot
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Availability</h3>
        <div className="flex flex-wrap -mx-2">
          {availability.map((slot) => (
            <div key={slot._id} className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-lg font-semibold">{slot.date}</p>
                <p className="text-gray-700">{slot.timeSlot}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
