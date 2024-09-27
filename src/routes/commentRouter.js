const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Định nghĩa các route cho comment
// Route để lấy comment theo user_id
router.get('/user/:user_id', commentController.getCommentsByUserId);

// Route để lấy comment theo destination_id
router.get('/destination/:destination_id', commentController.getCommentsByDestinationId);

router.post('/', commentController.createComment); // Tạo comment mới
router.get('/', commentController.getAllComments); // Lấy tất cả comment
router.get('/:id', commentController.getCommentById); // Lấy comment theo ID
router.put('/:id', commentController.updateComment); // Cập nhật comment
router.delete('/:id', commentController.deleteComment); // Xóa comment

module.exports = router;
