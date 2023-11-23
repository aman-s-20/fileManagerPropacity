const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

 
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach user information to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
