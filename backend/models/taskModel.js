const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    required: true,
    default: "PENDING",
  },
  deadline: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
});
module.exports = mongoose.model("tasks", taskSchema);
