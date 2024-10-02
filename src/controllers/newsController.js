const newsService = require('../services/newsService');

// Lấy tất cả tin tức
exports.getAllNews = async (req, res) => {
    try {
        const newsList = await newsService.getAllNews();
        res.status(200).json(newsList);
    } catch (error) {
        console.error("Error retrieving news:", error);
        res.status(500).json({ message: "Lỗi khi lấy tin tức", error });
    }
};

// Tạo mới tin tức
exports.createNews = async (req, res) => {
    const { title, content, summary, author, category, tags, images } = req.body;
    try {
        const newNews = await newsService.createNews({ title, content, summary, author, category, tags, images });
        res.status(201).json(newNews);
    } catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ message: "Lỗi khi tạo tin tức", error });
    }
};

// Cập nhật tin tức
exports.updateNews = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedNews = await newsService.updateNews(id, updatedData);
        res.status(200).json(updatedNews);
    } catch (error) {
        console.error("Error updating news:", error);
        res.status(500).json({ message: "Lỗi khi cập nhật tin tức", error });
    }
};

// Xóa tin tức
exports.deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        await newsService.deleteNews(id);
        res.status(200).json({ message: "Xóa tin tức thành công" });
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ message: "Lỗi khi xóa tin tức", error });
    }
};
