const mongoose = require('mongoose');

// Schema cho comment
const commentSchema = new mongoose.Schema({
    user_id: { // ID của người dùng (người viết comment)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết tới bảng User
        required: false, // không bắt buộc
    },
    destination_id: { // ID của điểm đến mà comment thuộc về
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination', // Liên kết tới bảng Destination
        required: false,
    },
    user_name: { // Tên người dùng (bắt buộc nhập)
        type: String,
        required: false,
    },
    user_email: { // Email người dùng (không bắt buộc)
        type: String,
        required: false
    },
    content: { // Nội dung của comment
        type: String,
        required: false
    },
    rating: { // Đánh giá (từ 1 đến 5 sao)
        type: Number,
        min: 1,
        max: 5,
        required: false
    },
    likes: [{ // Danh sách các user thích comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    created_at: { // Thời gian tạo comment
        type: Date,
        default: Date.now
    },
    updated_at: { // Thời gian cập nhật comment
        type: Date,
        default: Date.now
    }
});

// Tự động cập nhật `updated_at` khi bản ghi được chỉnh sửa
commentSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Tạo model từ schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
