import mongoose from 'mongoose';
import { ENV } from '../config/env.js';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';

const createAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ role: 'admin' });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    });

    console.log('Admin created successfully!');
    console.log('   Email:', admin.email);
    console.log('   Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error(' Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();