import express from "express";
import auth from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";

const router = express.Router();

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks of logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   POST /api/tasks
 * @desc    Create new task
 */
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.user.id,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task (only own task)
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task (only own task)
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

