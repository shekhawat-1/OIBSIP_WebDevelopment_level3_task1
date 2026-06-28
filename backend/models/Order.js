const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza"
      },
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Order", orderSchema);