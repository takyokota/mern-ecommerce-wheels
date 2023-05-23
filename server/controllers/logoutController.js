const User = require('../models/User');

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content/cookies
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204); // No users loggedin found
  }

  // Delete refreshToken in db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  // console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
  res.status(200).json({ 'message': 'The user logged out!' });
  // console.log('logout');
};

module.exports = { handleLogout };