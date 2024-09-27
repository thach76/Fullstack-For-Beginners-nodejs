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

// Lấy comment theo user_id
const getCommentsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const comments = await Comment.find({ user_id });

        if (!comments) {
            return res.status(404).json({ message: 'Không tìm thấy comment cho user này.' });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.', error });
    }
};

// Lấy comment theo destination_id
const getCommentsByDestinationId = async (req, res) => {
    try {
        const { destination_id } = req.params;
        const comments = await Comment.find({ destination_id });

        if (!comments) {
            return res.status(404).json({ message: 'Không tìm thấy comment cho điểm đến này.' });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.', error });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByUserId,
    getCommentsByDestinationId,
};
