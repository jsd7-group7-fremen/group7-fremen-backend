import User from "../models/user.model.js";
import NotFoundError from "../error/NotFoundError.js";

// GET all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET user by ID
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }
    res.status(200).json({ message: "Get User By Id", data: user });
  } catch (error) {
    next(error);
  }
};

// DELETE user by ID (Soft Delete)
const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }
    user.userStatus = "deleted"; // soft delete by changing status to deleted
    await user.save();
    res.status(200).json({ message: "User soft deleted" });
  } catch (error) {
    next(error);
  }
};
export { getAllUsers, getUserById, deleteUserById };
