const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  // check for duplicate username in the db
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.status(409).json({ 'message': 'The username is already taken.' });  // Conflict

  // encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10);

  // create a new user
  const newUser = new User({
    username: username,
    // fName: req.body.fName,
    // lName: req.body.lName,
    // email: req.body.email,
    password: hashedPwd,
    roles: roles,
    // shippingAddress: {
    //   street: req.body.shippingAddress.street,
    //   city: req.body.shippingAddress.city,
    //   state: req.body.shippingAddress.state,
    //   zip: req.body.shippingAddress.zip
    // }
  });

  try {
    await newUser.save();
    res.status(201).json({ "success": `New user ${username} created!` });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = { createUser };