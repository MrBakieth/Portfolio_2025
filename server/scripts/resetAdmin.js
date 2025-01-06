require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Delete existing admin user
    await User.deleteOne({ username: process.env.ADMIN_USERNAME });
    console.log('Existing admin user deleted');

    // Create new admin user
    const admin = new User({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    });

    await admin.save();
    console.log('New admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin user:', error);
    process.exit(1);
  }
};

resetAdmin(); 