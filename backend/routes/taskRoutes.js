const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getDashboardData,
    getUserDashboardData,
    updateChecklist,
    updateTaskChecklist
} = require("../controllers/taskController");
const { protect } = require("../middleware/authmiddleware");

// Dashboard routes - MUST be defined BEFORE /:id route to avoid conflicts
router.get("/dashboard", protect, getDashboardData);
router.get("/user-dashboard", protect, getUserDashboardData);

// Base routes
router.route("/")
    .get(protect, getTasks)
    .post(protect, createTask);

// Task by ID routes - these MUST come AFTER specific routes like /dashboard
router.route("/:id")
    .get(protect, getTaskById)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

// Checklist routes
router.put("/:taskId/todo/:todoId", protect, updateTaskChecklist);

module.exports = router;