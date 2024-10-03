const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

// Route lấy tất cả tin tức
router.get('/', newsController.getAllNews);

// Route lấy tin tức theo id

router.get('/:id', newsController.getNewsById);

// Route tạo tin tức mới
router.post('/', newsController.createNews);

// Route cập nhật tin tức
router.put('/:id', newsController.updateNews);

// Route xóa tin tức
router.delete('/:id', newsController.deleteNews);

module.exports = router;
