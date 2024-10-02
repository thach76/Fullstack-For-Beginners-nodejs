const mongoose = require('mongoose');

// Schema cho tin tức
const newsSchema = new mongoose.Schema({
    title: { // Tiêu đề của tin tức
        type: String,
        required: false
    },
    content: { // Nội dung chi tiết của tin tức
        type: String,
        required: false
    },
    summary: { // Tóm tắt ngắn gọn
        type: String,
        required: false
    },
    author: { // Tác giả của bài viết
        type: String,
        required: false
    },
    category: { // Loại tin tức (vd: thể thao, giải trí, chính trị,...)
        type: String,
        required: false
    },
    tags: [{ // Danh sách các thẻ tag liên quan
        type: String,
    }],
    images: [{ // Mảng chứa các URL của hình ảnh
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ''
        }
    }],
    publishDate: { // Ngày xuất bản
        type: Date,
        default: Date.now
    },
    updated_at: { // Ngày cập nhật bài viết
        type: Date,
        default: Date.now
    },
    views: { // Số lượng lượt xem
        type: Number,
        default: 0
    }
});

// Tự động cập nhật `updated_at` khi bản ghi được chỉnh sửa
newsSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
