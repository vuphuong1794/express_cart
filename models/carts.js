const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  id: String,
  userId: String,
  products: [
    {
      productId: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
