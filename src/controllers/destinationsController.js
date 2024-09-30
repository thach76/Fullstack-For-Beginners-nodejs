const destinationsService = require("../services/destinationService");

// Tạo mới một điểm du lịch
exports.createDestination = async (req, res) => {
  try {
    if (typeof req.body.images === "string") {
      req.body.images = req.body.images.split(",").map((item) => item.trim());
    }
    if (typeof req.body.video === "string") {
      req.body.video = req.body.video.split(",").map((item) => item.trim());
    }

    const newDestination = await destinationsService.createDestination(req.body);
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo điểm du lịch", error });
  }
};

// Lấy tất cả các điểm du lịch
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await destinationsService.getAllDestinations();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách điểm du lịch", error });
  }
};

// Lấy một điểm du lịch theo ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await destinationsService.getDestinationById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Điểm du lịch không tồn tại" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy điểm du lịch", error });
  }
};

// Cập nhật một điểm du lịch theo ID
exports.updateDestination = async (req, res) => {
  try {
    const destination = await destinationsService.updateDestination(req.params.id, req.body);
    if (!destination) return res.status(404).json({ message: "Điểm du lịch không tồn tại" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật điểm du lịch", error });
  }
};

// Xóa một điểm du lịch theo ID
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await destinationsService.deleteDestination(req.params.id);
    if (!destination) return res.status(404).json({ message: "Điểm du lịch không tồn tại" });
    res.status(200).json({ message: "Điểm du lịch đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa điểm du lịch", error });
  }
};

// Lấy ngẫu nhiên n điểm đến
exports.getRandomDestinations = async (req, res) => {
  const count = parseInt(req.query.count) || 1;  // Số lượng đối tượng cần lấy, mặc định là 1

  try {
    const destinations = await destinationsService.getRandomDestinations(count);
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error retrieving random destinations:", error);
    res.status(500).json({ message: "Lỗi khi lấy điểm du lịch getRandomDestinations", error });
  }
};

// Lấy ngẫu nhiên n ảnh
exports.getRandomImages = async (req, res) => {
  const count = parseInt(req.query.count) || 1;  // Số lượng đối tượng cần lấy, mặc định là 1

  try {
    const images = await destinationsService.getAllImages(req.params.id);
    const randomImages = destinationsService.getRandomItems(images, count);
    res.status(200).json(randomImages);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy ảnh ngẫu nhiên getRandomImages", error });
  }
};

// Lấy tất cả ảnh
exports.getAllImages = async (req, res) => {
  try {
    const images = await destinationsService.getAllImages(req.params.id);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy ảnh", error });
  }
};


// API lấy ngẫu nhiên n video
exports.getRandomVideos = async (req, res) => {
  const count = parseInt(req.query.count) || 1;  // Số lượng đối tượng cần lấy, mặc định là 1
  try {
    const destination = await destinationsService.getDestinationById(req.params.id);
    const randomVideo = destinationsService.getRandomItems(destination.video, count);
    res.status(200).json({ video: randomVideo });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy video ngẫu nhiên", error });
  }
};



// Lấy tất cả video
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await destinationsService.getAllVideos(req.params.id);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy video", error });
  }
};

