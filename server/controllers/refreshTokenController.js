const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies);
  if (!cookies?.jwt) return res.status(401).json({ 'message': 'You are not authorized' }); // Unauthorized
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden 

  // evaluate jwt 
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) return res.status(403).json({ 'message': 'Token is not valid' });
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": decoded.username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );
      res.json({ roles, accessToken });
    }
  );
};

module.exports = { handleRefreshToken };