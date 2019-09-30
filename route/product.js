const express = require("express");
const router = express.Router();
const multer = require("multer");

// Controllers
const productController = require("../controllers/product");

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

var productUpload = multer({ storage }).fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "images", maxCount: 8 }
]);

router.post("/create", isAdmin, productUpload, productController.createProduct);
router.post("/find", productController.findProduct);
router.get("/find/:id", productController.findSingleProduct);

module.exports = router;
