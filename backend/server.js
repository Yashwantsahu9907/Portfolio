import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import { fileURLToPath, fileURlToPath } from 'url';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';




// Load environment variable from env file
dotenv.config();
// Connect to the database
connectDB();

// create express app
const app = express();

// Fix _dirname in  ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Global middleware connect frontend and  backend
app.use(cors());
app.use(express.json()); // for reading the json data from the frontend


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/upload', uploadRoutes);

// Connect with admin URL
app.use('/api/admin/project', projectRoutes);
app.use('/api/admin/messages', contactRoutes);


// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' ,
message: 'Server is running smoothly'
    });
});



// Static Upload folder file access by the browser
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Error middleware
app.use(notfound);
app.use(errorHandler);


// For port using from env
const PORT = process.env.PORT || 5000;





app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});