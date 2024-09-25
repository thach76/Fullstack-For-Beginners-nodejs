const Destination = require("../models/Destination");

// Tạo mới một điểm du lịch
exports.createDestination = async (req, res) => {
  try {
    // Kiểm tra và chuyển đổi dữ liệu 'images' và 'video' thành mảng nếu cần
    if (typeof req.body.images === "string") {
      req.body.images = req.body.images.split(",").map((item) => item.trim());
    }

    if (typeof req.body.video === "string") {
      req.body.video = req.body.video.split(",").map((item) => item.trim());
    }

    // Tạo đối tượng điểm du lịch mới
    const newDestination = new Destination(req.body);
    await newDestination.save();

    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo điểm du lịch", error });
  }
};

// Lấy tất cả các điểm du lịch
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách điểm du lịch", error });
  }
};

// Lấy một điểm du lịch theo ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Điểm du lịch không tồn tại" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy điểm du lịch", error });
  }
};

// Cập nhật một điểm du lịch theo ID
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination)
      return res.status(404).json({ message: "Điểm du lịch không tồn tại" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật điểm du lịch", error });
  }
};

// Xóa một điểm du lịch theo ID
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Điểm du lịch không tồn tại" });
    res.status(200).json({ message: "Điểm du lịch đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa điểm du lịch", error });
  }
};

// lấy ngẫu nhiên 4 điểm đến
exports.getRandomDestinations = async (req, res) => {
  try {
    // Sử dụng MongoDB aggregate với $sample để lấy ngẫu nhiên 4 destination
    const destinations = await Destination.aggregate([
      { $sample: { size: 4 } },
    ]);

    const result = destinations.map((dest, index) => {
      const randomImage =
        dest.images.length > 0
          ? dest.images[Math.floor(Math.random() * dest.images.length)]
          : null; // Lấy ngẫu nhiên 1 hình ảnh từ mảng images

      return {
        id: `top-banner-${index + 1}`, // vẫn giữ id gốc của MongoDB
        destination: dest.name,
        visitValue: dest.visit.toString(),
        territoryValue: dest.territory.toString(),
        priceValue: dest.price.toString(),
        imgLink: randomImage, // Đường dẫn hình ảnh ngẫu nhiên
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving random destinations:", error);
    res.status(500).json({ message: "Lỗi khi lấy điểm du lịch", error });
  }
};
