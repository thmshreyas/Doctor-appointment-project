import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)

  const [appointments, setAppointments] = useState(
    doctors.slice(0, 3).map((doctor, index) => ({
      id: index + 1,
      doctor: {
        name: doctor.name,
        specialty: doctor.speciality,
        image: doctor.image,
      },
      date: '2025-06-0' + (index + 5),
      time: `${10 + index}:00 AM`,
    }))
  )

  const handleCancel = (id) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={appointment.doctor.image} alt={appointment.doctor.name} className="w-16 h-16 rounded-full border" />
              <div>
                <p className="text-lg font-semibold">{appointment.doctor.name}</p>
                <p className="text-sm text-gray-600">{appointment.doctor.specialty}</p>
                <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Pay Now</button>
              <button onClick={() => handleCancel(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments