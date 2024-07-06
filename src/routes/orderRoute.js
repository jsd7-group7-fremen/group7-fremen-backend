// Import necessary modules
const express = require("express");
const Order = require("../model/order.model.js");

// Create a router instance
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
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
});

// DELETE (soft delete) an order by ID
router.delete("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.isDeleted = true;
    const deletedOrder = await order.save();
    res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
});

// PUT update an order by ID
router.put("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// Export the router
module.exports = router;
