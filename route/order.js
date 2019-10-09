const express = require("express");
const router = express.Router();

// Controllers
const orderController = require("../controllers/order");

// Middlewares;
const isAdmin = require("../middlewares/isAdmin");

router.post("/allorders", isAdmin, orderController.fetchAllOrders);

module.exports = router;
