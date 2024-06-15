import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Check if Authorization header exists
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract token from header
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to request object
    next();
  } catch (err) {
    // Token is not valid
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
