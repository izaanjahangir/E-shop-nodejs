const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/user");

// Middlewares;
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
