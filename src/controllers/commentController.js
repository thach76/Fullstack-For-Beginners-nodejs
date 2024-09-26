const commentService = require('../services/commentService');

// Lấy tất cả các comment
const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy comment theo ID
const getCommentById = async (req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment không tồn tại' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Tạo comment mới
const createComment = async (req, res) => {
    try {
        const newComment = await commentService.createComment(req.body);
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }
};

// Cập nhật comment
const updateComment = async (req, res) => {
    try {
        const updatedComment = await commentService.updateComment(req.params.id, req.body);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment không tồn tại' });
        }
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }
};

// Xóa comment
const deleteComment = async (req, res) => {
    try {
        const deletedComment = await commentService.deleteComment(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment không tồn tại' });
        }
        res.json({ message: 'Comment đã được xóa' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};
