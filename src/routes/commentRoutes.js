const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Định nghĩa các route cho comment
// Route để lấy các comment theo user_id
router.get('/user/:user_id', commentController.getCommentsByUserId);

// Route để lấy các comment theo destination_id
router.get('/destination/:destination_id', commentController.getCommentsByDestinationId);
router.get('/destination', commentController.getCommentsByDestination);

// Route để lấy các comment theo news_id
router.get('/news/:news_id', commentController.getCommentsByNewsId);
router.get('/news', commentController.getCommentsByNews);

router.post('/', commentController.createComment); // Tạo comment mới
router.get('/', commentController.getAllComments); // Lấy tất cả comment
router.get('/:id', commentController.getCommentById); // Lấy comment theo ID
router.put('/:id', commentController.updateComment); // Cập nhật comment
router.delete('/:id', commentController.deleteComment); // Xóa comment

module.exports = router;
