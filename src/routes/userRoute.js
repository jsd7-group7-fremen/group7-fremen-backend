const express = require("express");
const User = require("../models/user.model.js");

const router = express.Router();

//ดึงข้อมูลผู้ใช้งานทุกคน
router.get("/", async (req, res, next) => {
  res.json("user connected");
});

//ดึงข้อมูลผู้ใช้งานโดย admin
router.get("/:userId", async (req, res, next) => {});

//ลบบัญชีผู้ใช้งาน (Soft Delete)
router.delete("/:userId", async (req, res, next) => {});

module.exports = router;
