const users = require("../models/userModel");

const addUser = async (req) => {
  const user = new users({
    name: req.name,
    password: req.password,
    email: req.email,
  });
  return await user.save();
};
const exists = async (email) => {
  const x = await users.countDocuments({ email: email });
  return x;
};
const validateUser = (user) => {
  return users.countDocuments({
    email: user.email,
    password: user.password,
  });
};

module.exports = {
  addUser,
  exists,
  validateUser,
};
