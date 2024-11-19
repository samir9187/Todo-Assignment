// // models/Todo.js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
} ,{ timestamps: true } );

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
