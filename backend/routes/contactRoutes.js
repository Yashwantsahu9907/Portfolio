import express from 'express';
import { createMessage,
    getMessages,  // Fetch the all messages for admin 
} from '../controllers/contactController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(createMessage)
.get(protect, getMessages);

export default router;