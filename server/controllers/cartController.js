const Cart = require('../models/Cart');

// GET USER CART
const getCart = async (req, res) => {
  try {
    const result = await Cart.findOne({username: req.user});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE
const postCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const result = await newCart.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const putCart = async (req, res) => {
  try {
    const result = await Cart.findOneAndUpdate({username: req.user}, {
      $set: req.body
    }, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteCart = async (req, res) => {
  try {
    const result = await Cart.findByOneAndDelete({username: req.user});
    res.status(200).json({ 'message': 'Cart has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getCart,
  postCart,
  putCart,
  deleteCart
};