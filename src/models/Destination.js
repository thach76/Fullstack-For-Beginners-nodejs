const mongoose = require('mongoose');

// Schema cho điểm đến du lịch
const destinationSchema = new mongoose.Schema({
    name: { // Tên của điểm đến 1
        type: String,
        required: true
    },
    description: { // Mô tả chi tiết về điểm đến 2
        type: String,
        required: false, // Không bắt buộc
        default: ""
    },
    location: { // Địa điểm của điểm đến 3 
        type: String,
        required: false, // Không bắt buộc
        default: ""
    },
    price: { // giá của điểm đến 4
        type: Number,
        required: false, // Không bắt buộc
        default: 0
    },
    territory: { // diện tích 5
        type: Number,
        required: false, // Không bắt buộc
        default: 0
    },
    visit: { // số người ghé thăm 6
        type: Number,
        required: false, // Không bắt buộc
        default: 0
    },
    type: { // hotel, tourist spot, restaurant
        type: String,
        required: false, // Không bắt buộc
        default: ""
    },
    images: [{ // Mảng chứa các URL của nhiều hình ảnh 8
        type: String,
        default: []
    }],
    videos: [{ // URL video giới thiệu về điểm đến 9
        type: String,
        default: []
    }],
    created_at: { // Thời gian tạo bản ghi 10 
        type: Date,
        default: Date.now,
    },
    updated_at: { // Thời gian cập nhật bản ghi 11
        type: Date,
        default: Date.now,
    }
});


// Tự động cập nhật `updated_at` khi bản ghi được chỉnh sửa
destinationSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Tạo model từ schema
const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
