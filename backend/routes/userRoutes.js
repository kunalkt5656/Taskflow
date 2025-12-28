const express = require("express");
const { protect, adminOnly } = require("../middleware/authmiddleware");
const { getUsers, getUsersById, deleteUser } = require("../controllers/userController");
 
const router = express.Router();

// Define routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUsersById);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router; 