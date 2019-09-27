const express = require("express");
const router = express.Router();
const multer = require("multer");

// Controllers
const categoryController = require("../controllers/category");

// Middlewares;
const isAdmin = require("../middlewares/isAdmin");

const storage = multer.diskStorage({
  destination: function(_, _, cb) {
    cb(null, "uploads");
  },
  filename: function(_, file, cb) {
    cb(null, file.originalname);
  }
});

router.post(
  "/create",
  isAdmin,
  multer({ storage }).single("image"),
  categoryController.createCategory
);
// router.post(
//   "/register",
//   multer({ storage }).single("image"),
//   userController.register
// );
// router.post("/login", userController.login);

module.exports = router;
