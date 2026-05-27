import express from 'express';
import { createMessage,
    getMessages,  // Fetch the all messages for admin 
} from '../controllers/contactController';

import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
.post(createMessage)
.get(protect, getmessages);

export default router;