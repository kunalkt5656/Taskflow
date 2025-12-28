const User = require("../models/User");
const Task = require("../models/Task");

// @desc    Get all users with task counts
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        const usersWithTaskCount = await Promise.all(
            users.map(async (user) => {
                const pendingTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: 'pending',
                });
                const inProgressTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: 'in-progress',
                });
                const completedTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: 'completed',
                });

                return {
                    ...user.toObject(),
                    pendingTasks,
                    inProgressTasks,
                    completedTasks
                };
            })
        );

        res.json(usersWithTaskCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single user by ID
const getUsersById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getUsersById, deleteUser };