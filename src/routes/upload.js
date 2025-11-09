const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadImage } = require('../controllers/uploadController');
const {
    upload,
    uploadImage
} = 

//POST /api/upload
router.post('/',authMiddlewarem, upload.single('image'), uploadImage);

module.exports = router;

