const Task = require("../models/Task");
const User = require("../models/User");

// @desc    Get Dashboard Statistics
// @route   GET /api/report/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: 'pending' });
        const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });
        const completedTasks = await Task.countDocuments({ status: 'completed' });

        const highPriority = await Task.countDocuments({ priority: 'high' });
        const mediumPriority = await Task.countDocuments({ priority: 'medium' });
        const lowPriority = await Task.countDocuments({ priority: 'low' });

        res.json({
            totalTasks,
            status: {
                pending: pendingTasks,
                inProgress: inProgressTasks,
                completed: completedTasks,
            },
            priority: {
                high: highPriority,
                medium: mediumPriority,
                low: lowPriority,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get User Performance
// @route   GET /api/report/user-performance
// @access  Private (Admin Only)
const getUserPerformance = async (req, res) => {
    try {
        const performance = await Task.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: "$assignedTo",
                    completedCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    _id: 1,
                    name: "$userDetails.name",
                    email: "$userDetails.email",
                    completedCount: 1
                }
            }
        ]);

        res.json(performance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- CRITICAL FIX: Export the functions here ---
module.exports = { getDashboardStats, getUserPerformance };