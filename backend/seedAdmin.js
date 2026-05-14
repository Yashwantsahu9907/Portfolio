import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

dotenv.config();

connectDB();

const seedAdmin = async () => {

  try {

    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (adminExists) {

      console.log('Admin already exists');

      process.exit();
    }

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    console.log('Admin created successfully');

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
};

seedAdmin();