const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Định nghĩa các route cho comment
router.post('/', commentController.createComment); // Tạo comment mới
router.get('/', commentController.getAllComments); // Lấy tất cả comment
router.get('/:id', commentController.getCommentById); // Lấy comment theo ID
router.put('/:id', commentController.updateComment); // Cập nhật comment
router.delete('/:id', commentController.deleteComment); // Xóa comment

module.exports = router;
