import Resume from '../models/Resume.js';  // import the resume model to interact the database
import fs from 'fs';     // for file system operation 
import path from 'path';  // For handling file path
import { fileURLToPath } from 'url';  // Fix for __dirname in ES modules

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Get the latest resume
const getLatestResume = async (req, res) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });

  if (resume) {
    res.json(resume);
  } else {
    res.json({ url: null, originalName: null });
  }
};

// Upload or update resume
const uploadResume = async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Delete old resumes to keep storage clean
  const oldResumes = await Resume.find({});

  if (oldResumes.length > 0) {
    for (const old of oldResumes) {
      try {
        const filePath = path.join(__dirname, '..', old.url);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error('Failed to delete old resume file:', error);
      }
    }

    await Resume.deleteMany({});
  }

  const url = `/${req.file.path.replace(/\\/g, '/')}`;
  const originalName = req.file.originalname;

  const resume = await Resume.create({
    url,
    originalName,
  });

  res.status(201).json(resume);
};

// Delete resume
const deleteResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume) {
    try {
      const filePath = path.join(__dirname, '..', resume.url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Failed to delete resume file:', error);
    }

    await resume.deleteOne();

    res.json({ message: 'Resume removed' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
};

export {
  getLatestResume,
  uploadResume,
  deleteResume,
};  