const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return next();

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return next();

  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this');
    req.userId = payload.id;
  } catch (e) {
    // invalid token — ignore and allow param-based routes to continue
  }

  next();
};
