const Destination = require("../models/Destination");

// Tạo mới một điểm du lịch
const createDestination = async (data) => {
  const newDestination = new Destination(data);
  return await newDestination.save();
};

// Lấy tất cả các điểm du lịch
const getAllDestinations = async () => {
  return await Destination.find();
};

// Lấy một điểm du lịch theo ID
const getDestinationById = async (id) => {
  return await Destination.findById(id);
};

// Cập nhật một điểm du lịch theo ID
const updateDestination = async (id, data) => {
  return await Destination.findByIdAndUpdate(id, data, { new: true });
};

// Xóa một điểm du lịch theo ID
const deleteDestination = async (id) => {
  return await Destination.findByIdAndDelete(id);
};

// Lấy ngẫu nhiên 4 điểm đến
const getRandomDestinations = async () => {
  const destinations = await Destination.aggregate([{ $sample: { size: 4 } }]);
  return destinations;
};

// Hàm lấy tất cả ảnh
const getAllImages = async (destinationId) => {
    const destination = await Destination.findById(destinationId);
    return destination ? destination.images : [];
  };
  
  // Hàm lấy tất cả video
  const getAllVideos = async (destinationId) => {
    const destination = await Destination.findById(destinationId);
    return destination ? destination.videos : [];
  };
  
  // Hàm lấy ngẫu nhiên 1 ảnh
  const getRandomImage = (images) => {
    return getRandomItem(images);
  };
  
  // Hàm lấy ngẫu nhiên 4 ảnh
  const getRandomImages = (images) => {
    if (!images || images.length === 0) return [];
    const randomImages = images.sort(() => 0.5 - Math.random()).slice(0, 4);
    return randomImages;
  };
  
  // Hàm lấy ngẫu nhiên một item
  const getRandomItem = (items) => {
    if (!items || items.length === 0) return null; // Kiểm tra xem mảng có rỗng không
    const randomIndex = Math.floor(Math.random() * items.length); // Lấy chỉ số ngẫu nhiên
    return items[randomIndex]; // Trả về item (ảnh/video) ngẫu nhiên
  };

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  getRandomDestinations,
  getAllImages,
  getAllVideos,
  getRandomImage,
  getRandomItem,
};
