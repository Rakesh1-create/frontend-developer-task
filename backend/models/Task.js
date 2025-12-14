import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  userId: mongoose.Schema.Types.ObjectId
});
export default mongoose.model("Task", taskSchema);
