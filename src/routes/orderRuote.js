const express = require("express");
const Order = require("../models/order.model.js");

const router = express.Router();

//คำสั่งซื้อสินค้าทั้งหมด
router.get("/", async (req, res, next) => {
  res.json("user connected");
});

//คำสั่งซื้อสินค้ารายการบุคคล
router.get("/:orderId", async (req, res, next) => {});

//สร้างคำสั่งซื้อสินค้า
router.post("/", async (req, res, next) => {});

//ลบคำสั่งซื้อสินค้า (Soft Delete)
router.delete("/:orderId", async (req, res, next) => {});

module.exports = router;
