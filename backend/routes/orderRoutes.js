const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");

const router = express.Router();

// Place Order
router.post("/", authMiddleware, async (req, res) => {
  try {

    const cartItems = await Cart.find({
      userId: req.user.id
    }).populate("pizzaId");

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.pizzaId.price * item.quantity);
    }, 0);

    const items = cartItems.map(item => ({
      pizzaId: item.pizzaId._id,
      quantity: item.quantity
    }));

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// Get My Orders
router.get("/", authMiddleware, async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.user.id
    }).populate("items.pizzaId");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
router.get("/all", authMiddleware, async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("userId")
      .populate("items.pizzaId");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "Cancelled"
      },
      {
        new: true
      }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
router.put("/status/:id", authMiddleware, async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;