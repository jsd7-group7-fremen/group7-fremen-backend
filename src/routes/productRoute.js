import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

//ดึงข้อมูลสินค้าทุกตัว, API-15
router.get("/", productController.getProducts);

//ดึงข้อมูลสินค้า 1 รายการ, API-16
router.get("/:productId", productController.getProductById);

//สร้างสินค้าใหม่, API-17
router.post("/", productController.createProduct);

//อัพเดตสินค้าแต่ละรายการ, API-18
router.patch("/:productId", productController.updateProduct);

//ลบสินค้าแต่ละรายการ, API-19 --> soft delete product from database by updating productStatus = "deleted"
router.delete("/:productId", productController.softDeleteProduct);

//ลบสินค้าแต่ละรายการจริง API-19-1 --> Hard delete ลบของจริงจาก database
router.delete("/hardDelete/:productId", productController.hardDeleteProduct);

export default router;
