const express = require('express');
const router = express.Router();

// Import from the controller
const { getDashboardStats, getUserPerformance } = require('../controllers/reportController');
const { protect, adminOnly } = require('../middleware/authmiddleware');

// Define routes
router.get('/dashboard', protect, getDashboardStats);
router.get('/user-performance', protect, adminOnly, getUserPerformance);

module.exports = router;