// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Route for image upload
router.post('/upload.image', upload.single('image'), uploadController.uploadImage);

// Route for video upload
router.post('/upload.video', upload.single('video'), uploadController.uploadVideo);

module.exports = router;
