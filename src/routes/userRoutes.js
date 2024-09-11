const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
// const delay = require("../middleware/delay");

const router = express.Router();

// router.use(delay);

// Không yêu cầu xác thực cho đăng ký và đăng nhập
router.post("/register", createUser);
router.post("/login", handleLogin);

// Yêu cầu xác thực cho các route còn lại
router.use(auth);
router.get("/user", getUser);
router.get("/account", getAccount);

module.exports = router;
