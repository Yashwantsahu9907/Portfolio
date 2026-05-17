import express from 'express';
import { uploadImage } from '../middleware/uploadMiddleware.js';

import { protect } from '../middleware/authMiddleware.js';    //uploaad only for admin

//create router 
const router = express.Router();

// upload file by POST request 

router.post('/', protect,   // protect- only admin can upload image
    // multer middleware to handle file upload
    uploadImage.single('image'), 

    // response callback function to send back the upload file path
    (req, res) => {
        res.send(`/${req.file.path.replace(/\\/g, '/')}`);
    }

);

export default router;

