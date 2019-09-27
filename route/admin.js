const express = require("express");
const router = express.Router();
// const multer = require("multer");

// Controllers
const adminController = require("../controllers/admin");

// Middlewares;
// const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/login", adminController.login);
// router.post(
//   "/register",
//   multer({ storage }).single("image"),
//   userController.register
// );
// router.post("/login", userController.login);

module.exports = router;
