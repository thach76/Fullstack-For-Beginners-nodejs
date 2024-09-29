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

// Lấy ngẫu nhiên 4 điểm đến
exports.getRandomDestinations = async (req, res) => {
  try {
    const destinations = await destinationsService.getRandomDestinations();
    const result = destinations.map((dest, index) => {
      const randomImage = destinationsService.getRandomItem(dest.images).url;
      return {
        _id: dest._id,
        id: `top-banner-${index + 1}`,
        destination: dest.name,
        visitValue: dest.visit.toString(),
        territoryValue: dest.territory.toString(),
        priceValue: dest.price.toString(),
        imgLink: randomImage,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving random destinations:", error);
    res.status(500).json({ message: "Lỗi khi lấy điểm du lịch", error });
  }
};

// API lấy ngẫu nhiên 1 ảnh
exports.getRandomImage = async (req, res) => {
  try {
    const destination = await destinationsService.getDestinationById(req.params.id);
    const randomImage = destinationsService.getRandomItem(destination.images);
    res.status(200).json({ image: randomImage });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy ảnh ngẫu nhiên", error });
  }
};

// Lấy ngẫu nhiên 4 ảnh
exports.getRandomImages = async (req, res) => {
  try {
    const images = await destinationsService.getAllImages(req.params.id);
    const randomImages = destinationsService.getRandomImages(images);
    res.status(200).json(randomImages);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy ảnh ngẫu nhiên", error });
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


// API lấy ngẫu nhiên 1 video
exports.getRandomVideo = async (req, res) => {
  try {
    const destination = await destinationsService.getDestinationById(req.params.id);
    const randomVideo = destinationsService.getRandomItem(destination.video);
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

