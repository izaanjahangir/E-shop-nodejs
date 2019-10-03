const express = require("express");
const router = express.Router();
const multer = require("multer");

// Controllers
const userController = require("../controllers/user");

// Middlewares;
const isAuthenticated = require("../middlewares/isAuthenticated");

const storage = multer.diskStorage({
  destination: function(_, _, cb) {
    cb(null, "uploads");
  },
  filename: function(_, file, cb) {
    cb(null, file.originalname);
  }
});

router.get("/", isAuthenticated, userController.getUser);
router.get("/:id", userController.getUserById);
router.post(
  "/register",
  multer({ storage }).single("image"),
  userController.register
);
router.post("/login", userController.login);
router.post("/changepassword", isAuthenticated, userController.changePassword);
router.post(
  "/update",
  isAuthenticated,
  multer({ storage }).single("image"),
  userController.updateUser
);
router.post("/charge", isAuthenticated, userController.charge);

module.exports = router;
