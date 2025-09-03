const { validateToken } = require("../Service/authService");

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && validateToken(token.split("Bearer ")[1])) {
    return next();
  }
  return res.status(401).json({ status: "Invalid Token" });
};

module.exports = checkAuth;
