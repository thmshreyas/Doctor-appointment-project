const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
require('dotenv').config();

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor-appointment');
    console.log('Connected to MongoDB');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // This will be hashed by the pre-save hook
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created');
    }

    // Add some sample doctors
    const doctors = [
      {
        name: 'Dr. John Smith',
        specialization: 'Cardiology'
      },
      {
        name: 'Dr. Sarah Johnson',
        specialization: 'Pediatrics'
      },
      {
        name: 'Dr. Michael Brown',
        specialization: 'Neurology'
      }
    ];

    for (const doctor of doctors) {
      const exists = await Doctor.findOne({ name: doctor.name });
      if (!exists) {
        await Doctor.create(doctor);
      }
    }
    console.log('Sample doctors added');

    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase(); 