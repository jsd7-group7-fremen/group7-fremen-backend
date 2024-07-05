const express = require("express");
const Cart = require("../models/cart.model.js");

const router = express.Router();

//ดึงข้อมูลสินค้าจากตะกร้าทั้งหมด
router.get("/", async (req, res, next) => {
  const carts = await Cart.findOne();
  console.log(carts);

  res.json("carts connected");
});

//ดึงข้อมูลสินค้าจากตะกร้าแต่ละตะกร้า
router.get("/:cartId", async (req, res, next) => {});

//สร้างตะกร้าสินค้าใหม่
router.post("/", async (req, res, next) => {});

//ลบสินค้าเดิมทิ้งหมดในตะกร้า แล้วเอาสินค้าจากตะกร้าหน้าบ้านทั้งหมดมาใส่ในตะกร้าเดิม
router.put("/:cartId", async (req, res, next) => {});

//ลบตะกร้าทิ้ง
router.delete("/:cartId", async (req, res, next) => {});

module.exports = router;
