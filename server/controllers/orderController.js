const Order = require('../models/Order');

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const result = await Order.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER Order
const getOrder = async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE
const postOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const result = await newOrder.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const putOrder = async (req, res) => {
  try {
    const result = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteOrder = async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ 'message': 'Order has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  postOrder,
  putOrder,
  deleteOrder
};