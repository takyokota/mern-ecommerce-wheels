const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    products: [{
      productId: { type: String },
      color: { type: String },
      quantity: { type: Number, default: 1 }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);