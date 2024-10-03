const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinationsController');

// Lấy n ngẫu nhiên điểm du lịch
router.get("/random", destinationsController.getRandomDestinations);

// Tạo mới một điểm du lịch
router.post("/", destinationsController.createDestination);

// Lấy tất cả các điểm du lịch
router.get("/", destinationsController.getAllDestinations);

// Lấy điểm du lịch theo loại
router.get('/type/:type', destinationsController.getDestinationsByType);

// Các route liên quan đến một điểm du lịch cụ thể
router.route("/:id")
  .get(destinationsController.getDestinationById)
  .put(destinationsController.updateDestination)
  .delete(destinationsController.deleteDestination);

// Các route lấy ngẫu nhiên từ một điểm du lịch cụ thể
router.get("/:id/images/random", destinationsController.getRandomImages);
router.get("/:id/videos/random", destinationsController.getRandomVideos);

// Lấy tất cả ảnh
router.get("/:id/images", destinationsController.getAllImages);

// Lấy tất cả video
router.get("/:id/videos", destinationsController.getAllVideos);


module.exports = router;
