const express = require("express");
const Pizza = require("../models/Pizza");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Get All Pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Add Pizza
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(pizza);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    await Pizza.findByIdAndDelete(req.params.id);

    res.json({
      message: "Pizza Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;