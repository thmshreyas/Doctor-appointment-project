import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useApp();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  // Debug logs
  console.log('Doctors in context:', doctors);
  console.log('docId from URL:', docId);

  useEffect(() => {
    const found = doctors.find(doc => String(doc._id) === String(docId));
    setDocInfo(found);
  }, [doctors, docId]);

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(generateTimeSlots());
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
      if (hour !== 17) slots.push(`${hour}:30`);
    }
    return slots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        doctorId: docId,
        doctorName: docInfo.name,
        date: selectedDate,
        time: selectedTime,
        userId: user._id,
        userName: user.name
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotification('Booking successful!');
      setTimeout(() => {
        setNotification('');
        navigate('/my-appointments');
      }, 1500);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setNotification('This slot is already booked. Please select another time.');
      } else {
        setError(err.response?.data?.message || 'Failed to book appointment');
      }
    }
  };

  if (!docInfo) return <div className="text-center mt-8">Doctor not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className={`mb-4 p-3 rounded text-center ${notification.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notification}</div>
      )}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img src={docInfo.image} alt={docInfo.name} className="w-48 h-48 object-cover rounded-xl border" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{docInfo.name}</h1>
          <p className="text-gray-600 mb-2">{docInfo.speciality} | {docInfo.degree} | {docInfo.experience}</p>
          <p className="mb-4 text-gray-700">{docInfo.about}</p>
          <p className="mb-2"><span className="font-semibold">Address:</span> {docInfo.address.line1}, {docInfo.address.line2}</p>
          <p className="mb-2"><span className="font-semibold">Fees:</span> ${docInfo.fees}</p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2 border rounded-md ${selectedTime === slot ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              disabled={!selectedDate || !selectedTime}
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;