const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function to authenticate user using JWT
module.exports = function (req, res, next) {
  // next is a callback to move to the next middleware

  // get token from header
  const token = req.header('x-auth-token');

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); // decode the token using the secret
    req.user = decoded.user; // attach the user from the token to the request object
    next(); // move to the next middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valis' });
  }
};
