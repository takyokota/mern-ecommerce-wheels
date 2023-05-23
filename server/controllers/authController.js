const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// LOGIN
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  try {
    // check for duplicate username in the db
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) return res.status(401).json({ "message": "You are not authorized" });

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      // create JWTs
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": foundUser.username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );
      const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      // console.log(result);
      // console.log(roles);

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      // Send authorization roles and access token to user
      res.status(200).json({ roles, accessToken });
    } else {
      res.status(401).json({ 'message': "The password didn't match." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a user
const getUser = async (req, res) => {
  const username = req.user;
  const roles = req.roles;
  res.status(200).json({ username, roles });
};

module.exports = { handleLogin, getUser };