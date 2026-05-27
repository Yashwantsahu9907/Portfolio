import express from 'express';
import { getLatestResume, uploadResume, deleteResume  } from '../controllers/resumeController.js';   

import { protect } from '../middleware/authMiddleware.js';
import { uploadPdf } from '../middleware/uploadMiddleware.js';


//Create a router 
const router = express.Router();

// Define routes for reume 
router.route('/')
 .get(getLatestResume) // get / api to fetch the latest resume

 .post(protect, uploadPdf.single('resume'), uploadResume);

 // Delete a  resume route

 router.route('/:id')

 .delete(protect, deleteResume);

 export default router;

