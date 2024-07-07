import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authController.getProfile);

router.patch("/profile", authController.updateProfile);

router.delete("/profile", authController.deleteProfile);

export default router;
