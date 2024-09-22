// controllers/uploadController.js
const uploadService = require('../services/uploadService');

// Controller for image upload
exports.uploadImage = async (req, res) => {
  try {
    const { file } = req; // Get the file from multer
    const imageUrl = await uploadService.uploadImage(file.path);
    res.status(200).json({ success: true, link: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
};

// Controller for video upload
exports.uploadVideo = async (req, res) => {
  try {
    const { file } = req; // Get the file from multer
    const videoUrl = await uploadService.uploadVideo(file.path);
    res.status(200).json({ success: true, link: videoUrl });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ success: false, message: 'Video upload failed' });
  }
};
