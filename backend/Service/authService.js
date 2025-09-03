const jwt = require("jsonwebtoken");
const secretkey = "rishab";

const createToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    secretkey
  );
};

const validateToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, secretkey);
};

module.exports = {
  createToken,
  validateToken,
};
