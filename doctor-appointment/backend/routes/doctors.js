const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { auth, isAdmin } = require('../middleware/auth');

// Add a new doctor (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, specialization } = req.body;
    const doctor = new Doctor({ name, specialization });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a doctor (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all doctors (public)
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 