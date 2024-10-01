require('dotenv').config();
const express = require('express');
const router = express.Router();

// lấy GOOGLE_MAPS_API_KEY
router.get('/maps-key', (req, res) => {
    const GOOGLE_MAPS_API_KEY= process.env.GOOGLE_MAPS_API_KEY
    res.status(200).json({ apiKey: GOOGLE_MAPS_API_KEY });
});

module.exports = router;
