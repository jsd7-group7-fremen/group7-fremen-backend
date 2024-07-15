import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

// เพิ่มสินค้าในตะกร้า
router.post("/:_id", cartController.addToCart);

// ลบสินค้าออกจากตะกร้า
router.delete("/", cartController.removeFromCart);

// อัปเดตจำนวนสินค้าในตะกร้า
router.patch("/", cartController.updateCart);

// ดึงข้อมูลตะกร้าสินค้าของผู้ใช้
router.get("/:userId", cartController.getCart);

// ลบตะกร้าสินค้าของผู้ใช้
router.post("/clear/:_id", cartController.clearCart);

export default router;
