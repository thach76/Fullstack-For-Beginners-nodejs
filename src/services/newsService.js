const News = require('../models/News');

// Lấy tất cả tin tức
exports.getAllNews = async () => {
    return await News.find().sort({ publishDate: -1 }); // Sắp xếp theo ngày xuất bản
};

// Lấy tin tức theo ID

exports.getNewsById = async (id) => {
    return await News.findById(id);
};

// Lấy tin tức theo từ khoá

exports.getNewsByKeyword = async (keyword) => {
    return await News.find({ $text: { $search: keyword } }).sort({ publishDate: -1 }); // Sắp xếp theo ngày xuất bản
};


// Tạo tin tức mới
exports.createNews = async (newsData) => {
    const newNews = new News(newsData);
    return await newNews.save();
};

// Cập nhật tin tức
exports.updateNews = async (id, updatedData) => {
    return await News.findByIdAndUpdate(id, updatedData, { new: true });
};

// Xóa tin tức
exports.deleteNews = async (id) => {
    return await News.findByIdAndDelete(id);
};
