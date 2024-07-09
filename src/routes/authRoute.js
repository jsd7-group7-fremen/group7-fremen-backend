import express from "express";
import * as authController from "../controllers/authController.js";
import authenticateMiddleware from "../middleware/authenticateMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authenticateMiddleware, authController.getProfile);

router.patch("/profile", authController.updateProfile);

router.delete("/profile", authController.deleteProfile);

export default router;
