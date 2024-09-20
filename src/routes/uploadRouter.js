require('dotenv').config();

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const router = express.Router();

// Cấu hình multer để upload file
const upload = multer({ dest: 'uploads/' });

// Route xử lý việc upload ảnh
router.post('/upload.image', upload.single('image'), async (req, res) => {
  try {
    // Đọc ảnh đã upload từ req.file.path
    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath, 'base64');

    // Gửi ảnh lên Imgur
    // Chuyển axios post vào bên trong try để tránh lỗi khi chưa khai báo biến
    const imgurResponse = await axios.post('https://api.imgur.com/3/image', {
      image: imageData,
      type: 'base64'
    }, {
      headers: {
        Authorization: `Client-ID ${process.env.Client_ID_IMGUR}` // Sử dụng Client ID của bạn
      }
    });

    // Xóa file ảnh sau khi upload thành công
    fs.unlinkSync(imagePath);

    // Trả về link ảnh từ Imgur
    res.status(200).json({
      success: true,
      link: imgurResponse.data.data.link
    });    

  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi upload ảnh' });
  }
});

module.exports = router;
