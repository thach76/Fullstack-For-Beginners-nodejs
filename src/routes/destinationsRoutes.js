const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinationsController');

// Các route cho điểm du lịch
router.post('/', destinationsController.createDestination);
router.get('/', destinationsController.getAllDestinations);
router.get('/:id', destinationsController.getDestinationById);
router.put('/:id', destinationsController.updateDestination);   
router.delete('/:id', destinationsController.deleteDestination);

module.exports = router;
