import express from "express";
import auth from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
});

export default router;
