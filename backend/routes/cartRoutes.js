const express = require("express");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add To Cart
router.post("/", authMiddleware, async (req, res) => {
  try {

    const cartItem = await Cart.create({
      userId: req.user.id,
      pizzaId: req.body.pizzaId,
      quantity: req.body.quantity
    });

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// Get User Cart
router.get("/", authMiddleware, async (req, res) => {
  try {

    const cart = await Cart.find({
      userId: req.user.id
    }).populate("pizzaId");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// Remove Cart Item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item Removed From Cart"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
module.exports = router;