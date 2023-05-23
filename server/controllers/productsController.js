const Product = require('../models/Product');

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const result = await Product.find();
    if (!result) return res.status(204).json({ 'message': 'No Products Found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET A PRODUCT
const getProduct = async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);

    if (!result) {
      return res.status(204).json({ 'message': `Product ID ${req.params.id} not found` });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE A PRODUCT
const postProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const result = await newProduct.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE A PRODUCT
const putProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE A PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ 'message': 'Item has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
};