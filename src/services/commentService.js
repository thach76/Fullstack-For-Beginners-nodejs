const Comment = require('../models/Comment');

// Lấy tất cả các comment
const getAllComments = async () => {
    return await Comment.find().populate('user_id destination_id', 'name');
};

// Lấy comment theo ID
const getCommentById = async (id) => {
    return await Comment.findById(id).populate('user_id destination_id', 'name');
};

// Tạo comment mới
const createComment = async (data) => {
    const newComment = new Comment(data);
    return await newComment.save();
};

// Cập nhật comment
const updateComment = async (id, data) => {
    return await Comment.findByIdAndUpdate(id, data, { new: true });
};

// Xóa comment
const deleteComment = async (id) => {
    return await Comment.findByIdAndDelete(id);
};

    
module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};
