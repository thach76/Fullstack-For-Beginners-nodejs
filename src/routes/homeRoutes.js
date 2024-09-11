const express = require('express');
const { getHomepage } = require('../controllers/homeController');

const router = express.Router();

// Route cho trang chủ
router.get('/', getHomepage);

module.exports = router;
