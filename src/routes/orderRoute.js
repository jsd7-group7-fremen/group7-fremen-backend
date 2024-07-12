import express from "express";
import Order from "../models/order.model.js";
import { validateOrder } from "../utils/validate.js";
import NotFoundError from "../error/NotFoundError.js";

const router = express.Router();

// GET all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET a specific order by ID
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// POST create a new order
router.post("/", async (req, res, next) => {
  try {
    // Validate order before saving
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
});

export default router;
