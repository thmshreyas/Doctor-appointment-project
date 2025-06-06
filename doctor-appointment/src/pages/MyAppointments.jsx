import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const MyAppointments = () => {
  const { user, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        if (user && !authLoading) {
          console.log('Fetching appointments for user:', user._id);
          const res = await axios.get('http://localhost:5000/api/appointments/my-appointments', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          setAppointments(res.data)
          setError('');
        } else if (!user && !authLoading) {
          console.log('Auth loading complete, but no user found. Clearing appointments.');
          setAppointments([]);
          setError('');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments')
        setAppointments([]);
      } finally {
        setLoading(false)
      }
    }

    console.log('useEffect running. User:', user, 'Auth Loading:', authLoading);
    fetchAppointments()

  }, [user, authLoading])

  const handleCancel = async (id) => {
    console.log('Attempting to cancel appointment with ID:', id);
    console.log('Current user object in handleCancel:', user);

    if (!user || !user._id) {
      console.error('CANCEL FAILED: User or user ID is not available. User object:', user);
      setNotification('Cannot cancel appointment: User not logged in or user data not loaded.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    console.log('User object is valid. Proceeding with cancellation for user ID:', user._id);

    try {
      await axios.delete(`http://localhost:5000/api/appointments/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setAppointments(prev => prev.filter(app => app._id !== id))
      setNotification('Appointment cancelled successfully.');
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      setNotification(err.response?.data?.message || 'Failed to cancel appointment.');
      setTimeout(() => setNotification(''), 2000);
    }
  }

  if (authLoading || loading) return <div className="text-center mt-8">Loading...</div>
  if (!authLoading && !user) return <div className="text-center mt-8">Please log in to view your appointments.</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      {notification && (
        <div className={`mb-4 p-3 rounded text-center ${notification.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notification}</div>
      )}
      <div className="space-y-6">
        {appointments.length === 0 && <div className="text-center text-gray-500">No appointments found.</div>}
        {appointments.map((appointment) => (
          <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600">
                {appointment.doctorName.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold">{appointment.doctorName}</p>
                <p className="text-sm text-gray-600">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                <p className="text-sm text-gray-600">Status: {appointment.status}</p>
              </div>
            </div>
            <button 
              onClick={() => handleCancel(appointment._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              disabled={!user || authLoading}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments