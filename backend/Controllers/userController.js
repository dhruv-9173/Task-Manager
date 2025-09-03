const { createToken } = require("../Service/authService");
const { addUser, exists, validateUser } = require("../Service/userService");

const handleRegister = (req, res) => {
  const user = req.body;
  try {
    if (!user.email || !user.password || !user.name) {
      return res.status(200).json({ status: "All fields required" });
    }
    if (exists(user.email) > 0)
      return res.status(409).json("Email already exits");
    addUser(user)
      .then(() => {
        return res.status(201).json("User Successfully Registered");
      })
      .catch((err) => {
        return res.status(400).json({ "Error Occured ": err });
      });
  } catch (err) {
    return res.status(500).json({ "Error Occured ": err });
  }
};

const handleLogin = (req, res) => {
  const user = req.body;
  try {
    if (!user.email || !user.password)
      return res.status(200).json("All fields required");
    validateUser(user).then((value) => {
      return value == 1
        ? res.status(200).json({ status: createToken(user) })
        : res.status(400).json({ status: "Invalid Credentials" });
    });
  } catch (err) {
    return res.status(500).json({ "Error Occured": err });
  }
};

module.exports = {
  handleLogin,
  handleRegister,
};
