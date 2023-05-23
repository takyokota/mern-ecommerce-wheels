const User = require('../models/User');

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const result = await User.find().select('-password');
    if (!result) return res.status(204).json({ 'message': 'No user found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET A USER
const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id).select('-password');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE A USER
const putUser = async (req, res) => {
  if (req.body.password) {
    // encrypt the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const result = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, { new: true }).select('-password');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE A USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ 'message': 'User has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  putUser,
  deleteUser
};