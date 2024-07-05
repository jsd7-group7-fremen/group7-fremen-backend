const express = require("express");
const Product = require("../model/product.model.js");

const router = express.Router();

//ดึงข้อมูลสินค้าทุกตัว
router.get("/", async (req, res, next) => {
  const products = await Product.findOne();
  console.log(products);

  res.json("products connected");
});

//ดึงข้อมูลสินค้า 1 รายการ
router.get("/:productId", async (req, res, next) => {});

//สร้างสินค้าใหม่
router.post("/", async (req, res, next) => {});

//อัพเดตสินค้าแต่ละรายการ
router.patch("/:productId", async (req, res, next) => {});

//ลบสินค้าแต่ละรายการ
router.delete("/:productId", async (req, res, next) => {});

module.exports = router;
