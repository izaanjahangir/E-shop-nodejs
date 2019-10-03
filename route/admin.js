const express = require("express");
const router = express.Router();

// Controllers
const adminController = require("../controllers/admin");

router.post("/login", adminController.login);

module.exports = router;
