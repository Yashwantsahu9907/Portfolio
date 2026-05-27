import express from 'express';

import { getSkills, createSkill, updateSkill, deleteSkill,  } from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router
  .route('/')
  .get(getSkills)
  .post(protect, createSkill);

router 
  .route('/:id')    //select by id
  .put(protect, updateSkill)     // update skills
  .delete(protect, deleteSkill);   // delete skills 

export default router;  