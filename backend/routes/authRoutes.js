import express from 'express';

// import controllers 
import { authAdmin, getAdminProfile } from '../controllers/authController.js';   

// authAdmin - admin logic handle karega aur getAdminProfile - admin ka profile return karega

import { protect } from '../middleware/authMiddleware.js';  // protect middleware - verify token and protect routes

const router = express.Router();   // express router create

router.post('/login', authAdmin); // admn login route handle

router.get('/verify', protect, getAdminProfile);  //admin profile route handle karega - protected route hoga, tab getAdminProfile chalega

export default router;