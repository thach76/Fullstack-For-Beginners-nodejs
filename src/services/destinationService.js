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

// Hàm lấy tất cả destination theo type
const getDestinationsByType = async (type) => {
  return await Destination.find({ type }).sort({ created_at: -1 });
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

// Lấy ngẫu nhiên n điểm đến
// const getRandomDestinations = async (count) => {
//   const randomDestinations = await Destination.aggregate([
//     { $sample: { size: count } }  // Lấy ngẫu nhiên `count` đối tượng
//   ]);
//   return randomDestinations;
// };

// Lấy ngẫu nhiên n điểm đến, có thể lọc theo type (nếu có)
const getRandomDestinations = async (type, count) => {
  try {
    const matchStage = type ? { $match: { type } } : {};  // Nếu có type thì lọc, không thì bỏ qua
    const randomDestinations = await Destination.aggregate([
      matchStage,  // Thêm bước match nếu có type
      { $sample: { size: count } }  // Lấy ngẫu nhiên n kết quả
    ]);
    return randomDestinations;
  } catch (error) {
    throw new Error("Error fetching random destinations");
  }
};

// Hàm lấy tất cả ảnh
const getAllImagesById = async (destinationId) => {
    const destination = await Destination.findById(destinationId);
    return destination ? destination.images : [];
  };
  
  // Hàm lấy tất cả video
  const getAllVideosById = async (destinationId) => {
    const destination = await Destination.findById(destinationId);
    return destination ? destination.videos : [];
  };
  
  // Hàm lấy ngẫu nhiên n item
  const getRandomItems = (items, count) => {
    if (!items || items.length === 0) return []; // Kiểm tra nếu mảng trống
  
    const result = [];
    const numItems = items.length;
  
    // Nếu số lượng cần lấy nhỏ hơn hoặc bằng số lượng phần tử trong mảng
    if (count <= numItems) {
      // Shuffle để đảm bảo không lặp phần tử
      const shuffledItems = [...items];
      for (let i = shuffledItems.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledItems[i], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[i]];
      }
  
      // Trả về n phần tử đầu tiên
      return shuffledItems.slice(0, count);
    } else {
      // Nếu số lượng cần lấy lớn hơn số lượng phần tử trong mảng, cho phép lặp lại
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * numItems); // Lấy chỉ số ngẫu nhiên
        result.push(items[randomIndex]); // Thêm phần tử ngẫu nhiên vào kết quả
      }
  
      return result;
    }
  };

  // Lấy tất cả ảnh
  const getAllImages = async () => {
    // Lấy tất cả các điểm đến
    const destinations = await Destination.find({}, 'images');
    // Gộp tất cả hình ảnh của các điểm đến vào một mảng
    return destinations.flatMap(destination => destination.images);
  };

  // Hàm lấy tất cả video
  const getAllVideos = async () => {
    // Lấy tất cả các điểm đến
    const destinations = await Destination.find({}, 'videos');
    // Gộp tất cả hình ảnh của các điểm đến vào một mảng
    return destinations.flatMap(destination => destination.videos);
  };
  

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationsByType,
  getDestinationById,
  updateDestination,
  deleteDestination,
  getRandomDestinations,
  getAllImagesById,
  getAllVideosById,
  getRandomItems,
  getAllImages,
  getAllVideos,
};
