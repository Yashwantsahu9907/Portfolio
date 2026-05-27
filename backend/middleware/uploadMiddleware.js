import multer from 'multer';   //multer is a file upload middleware which used to upload file to the server
import path from 'path';     // handle file path

import fs from 'fs';  //file system module to handle file system operation 

// upload folder path
const uploadDir = 'uploads/';

// check folder exist or not 
if (!fs.existsSync(uploadDir)) {    // existsSync() method is used to check if the folder is exist or not 
    fs.mkdirSync(uploadDir, { recursive: true }); //mkdirsync() method is used to create a folder if it does not exist recursive: true option is used to create a folder if they do not exist

}


// multer storage configuration 
const storage = multer.diskStorage({  //diskStorage() means file saving in disk   alternative- cloudinary, aws

    //upload destination it decide where to save th efile
    destination(req, file, cb) { // generate the upload path and file name
        cb(null, 'uploads/'); //cb() is a callback function which is used to send the response back to the client  null means no error and upload will be where file be stored
    },

    // File naming and configuration 
    filename(req, file, cb) {
        cb(null, '${file.fieldname}-${Date.now()}${path.extname(file.originalname)}'); //file.fieldname is the name of the file field in the form, Date.now() is used to generate a unique file name and path.extname() is used to get the file extension from the original file name
    },
});

// File type validation 
const checkImageFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|webp|gif/;  //allowed file types
    // extension check
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {

        return cb(null, true);

    } else {
        cb('Images only!');
    }
};


// Check Pdf file type validation 
const checkPdfFileType = (file, cb) => {
    const filetypes = /pdf/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);
    if (rxtname && mimetype) {
        return cb(null, true);

    } else {
        cb('PDFs only!');
    }
};



// multer upload configuration or image upload middleware
const uploadImage = multer({  // it creat image upload middleware
    storage, fileFilter: function (req, file, cb) {  // FileFilter is used to check the validation of file

        checkImageFileType(file, cb);
    },

});


// PDF upload middleware
const uploadPdf = multer({  // it creates PDF upload middleware
    storage, fileFilter: function (req, file, cb) {

        checkPdfFileType(file, cb);
    },

});


export { uploadImage, uploadPdf };



