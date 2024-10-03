const Comment = require('../models/Comment');
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
        const newComment = await commentService.createComment(req.body.user_id);
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: 'Dữ liệu không hợp lệ' , error: err , data: req.body.user_id });
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
        const comments = await Comment.find({ user_id }).sort({ created_at: -1 });;

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
    const { destination_id } = req.params;
    try {
        if (!destination_id) {
            return res.status(400).json({ message: 'destination_id không hợp lệ.' });
        }
        
        // Sắp xếp theo created_at, từ mới nhất đến cũ nhất
        const comments = await Comment.find({ destination_id }).sort({ created_at: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message , req_status: destination_id});
    }
};

// Lấy tất cả comment có description_id

const getCommentsByDestination = async (req, res) => {
    try {
        // Tìm tất cả các comments có destination_id không null
        const comments = await Comment.find({ destination_id: { $ne: null } }).sort({ created_at: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
    }
};


// Lấy comment theo news_id
const getCommentsByNewsId = async (req, res) => {
    const { news_id } = req.params;
    try {
        if (!news_id) {
            return res.status(400).json({ message: 'news_id không hợp lệ.' });
        }
        
        // Sắp xếp theo created_at, từ mới nhất đến cũ nhất
        const comments = await Comment.find({ news_id }).sort({ created_at: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message , req_status: destination_id});
    }
};

const getCommentsByNews = async (req, res) => {
    try {
        // Tìm tất cả các comments có destination_id không null
        const comments = await Comment.find({ news_id: { $ne: null } }).sort({ created_at: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
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
    getCommentsByDestination,
    getCommentsByNewsId,
    getCommentsByNews,
};
