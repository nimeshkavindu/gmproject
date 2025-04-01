// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) return res.json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: 'Unauthorized' });
  }
};