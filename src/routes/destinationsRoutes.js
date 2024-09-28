const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinationsController');

// Route lấy ngẫu nhiên 4 điểm đến
router.get("/random", destinationsController.getRandomDestinations);

// Tạo mới một điểm du lịch
router.post("/", destinationsController.createDestination);

// Lấy tất cả các điểm du lịch
router.get("/", destinationsController.getAllDestinations);

// Các route liên quan đến một điểm du lịch cụ thể
router.route("/:id")
  .get(destinationsController.getDestinationById)
  .put(destinationsController.updateDestination)
  .delete(destinationsController.deleteDestination);

// Các route lấy ngẫu nhiên từ một điểm du lịch cụ thể
router.get("/:id/random/image", destinationsController.getRandomImage);
router.get("/:id/random/video", destinationsController.getRandomVideo);

// Lấy ngẫu nhiên 4 ảnh
router.get("/:id/random/4images", destinationsController.getRandomImages);

// Lấy tất cả ảnh
router.get("/:id/images", destinationsController.getAllImages);

// Lấy tất cả video
router.get("/:id/videos", destinationsController.getAllVideos);


module.exports = router;
