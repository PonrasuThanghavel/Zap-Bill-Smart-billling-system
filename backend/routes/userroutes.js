const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");

// User Routes
router.post("/register", userController.registerUser); // Register a new user
router.post("/login", userController.loginUser); // User login
router.get("/:userID", userController.getUserById); // Get user details
router.put("/:userID", userController.updateUser); // Update user info
router.delete("/:userID", userController.deleteUser); // Delete user

module.exports = router;
