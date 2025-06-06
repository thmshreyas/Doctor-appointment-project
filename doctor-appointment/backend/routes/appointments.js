const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { auth, isAdmin } = require('../middleware/auth');

// Create appointment (authenticated users)
router.post('/', auth, async (req, res) => {
  try {
    const { doctorName, date, time } = req.body;
    // Check for duplicate
    const existing = await Appointment.findOne({ doctorName, date, time });
    if (existing) {
      return res.status(409).json({ message: 'This slot is already booked. Please select another time.' });
    }
    const appointment = new Appointment({
      userId: req.user._id,
      doctorName,
      date,
      time
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's appointments
router.get('/my-appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all appointments (admin only)
router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment status (admin only)
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete appointment (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 