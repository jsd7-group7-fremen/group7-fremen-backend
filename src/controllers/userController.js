// Manage logic about users
import User from "../models/user.model.js";

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE user by ID (Soft Delete)
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.userStatus = "deleted"; // Soft delete by changing status to "deleted"
    await user.save(); // Save updated userStatus
    res.status(200).json({ message: "User soft deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllUsers, getUserById, deleteUserById };
