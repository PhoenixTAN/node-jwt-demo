const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// POST /user/login
router.post("/login", userController.login);
router.get("/records", userController.records);

module.exports = router;
