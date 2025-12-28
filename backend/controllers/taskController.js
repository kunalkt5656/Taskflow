const Task = require("../models/Task");

// @desc    Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, assignedTo, attachments, todoChecklist } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user.id,
            attachments,
            todoChecklist,
        });

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tasks
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find(filter)
                .populate("assignedTo", "name email profileImage")
                .populate("createdBy", "name email");
        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user._id })
                .populate("assignedTo", "name email profileImage");
        }

        // Add completed todo count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.isCompleted
                ).length;

                return { ...task._doc, completedTodoCount: completedCount };
            })
        );

        // Get task statistics
        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            status: "pending",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        });

        const inProgressTasks = await Task.countDocuments({
            status: "in-progress",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        });

        const completedTasks = await Task.countDocuments({
            status: "completed",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        });

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pending: pendingTasks,
                inProgress: inProgressTasks,
                completed: completedTasks,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get single task
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("assignedTo", "name email profileImage")
            .populate("createdBy", "name email");

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update checklist
const updateChecklist = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Checklist updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task checklist item
const updateTaskChecklist = async (req, res) => {
    try {
        const { taskId, todoId } = req.params;
        const { isCompleted } = req.body;

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });


        // Find and update the specific checklist item
        const todoItem = task.todoChecklist.id(todoId);
        if (!todoItem) return res.status(404).json({ message: "Checklist item not found" });

        todoItem.isCompleted = isCompleted;

        // Recalculate progress
        const completedCount = task.todoChecklist.filter(item => item.isCompleted).length;
        task.progress = task.todoChecklist.length > 0
            ? Math.round((completedCount / task.todoChecklist.length) * 100)
            : 0;

        await task.save();

        res.json({ message: "Checklist item updated", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.deleteOne();
        res.json({ message: "Task removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get admin dashboard data
const getDashboardData = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: 'pending' });
        const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });
        const completedTasks = await Task.countDocuments({ status: 'completed' });

        // Get tasks due today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tasksDueToday = await Task.countDocuments({
            dueDate: { $gte: today, $lt: tomorrow }
        });

        // Get recent tasks
        const recentTasks = await Task.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("assignedTo", "name email profileImage");

        res.json({
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            tasksDueToday,
            recentTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user-specific dashboard data
const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalTasks = await Task.countDocuments({ assignedTo: userId });
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: 'pending' });
        const inProgressTasks = await Task.countDocuments({ assignedTo: userId, status: 'in-progress' });
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: 'completed' });

        // Get tasks due today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tasksDueToday = await Task.countDocuments({
            assignedTo: userId,
            dueDate: { $gte: today, $lt: tomorrow }
        });

        // Get recent assigned tasks
        const recentTasks = await Task.find({ assignedTo: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("assignedTo", "name email profileImage");

        res.json({
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            tasksDueToday,
            recentTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// IMPORTANT: Export all functions
module.exports = {
    createTask,
    getTasks,
    getTaskById,
    getUserDashboardData,
    getDashboardData,
    updateTask,
    updateChecklist,
    updateTaskChecklist,
    deleteTask
};