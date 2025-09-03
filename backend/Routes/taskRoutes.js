const express = require("express");
const router = express.Router();
const {
  handleAddTask,
  handleDeleteTask,
  handleUpdateTask,
  handleGetAllTasks,
} = require("../Controllers/taskController");
router.post("/", (req, res) => handleAddTask(req, res));
router.get("/", (req, res) => handleGetAllTasks(req, res));
router.put("/", (req, res) => handleUpdateTask(req, res));
router.delete("/:id", (req, res) => handleDeleteTask(req, res));

module.exports = router;
