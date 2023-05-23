const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: Array, required: true },
    color: { type: [String], required: true },
    image: { type: Map, of: String, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);