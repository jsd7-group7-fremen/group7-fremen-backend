// Set Route & Connect to userController
import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUserById);

export default router;
