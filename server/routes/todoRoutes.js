import express from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new TODO
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;
    if (!title || !description) {
      return res.status(400).json({ message: "server: Title and description are required" });
    }
    const newTodo = new Todo({
      title,
      description,
      userId,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: "Error adding todo", error });
  }
});

// Get all TODOs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id })
      .sort({ updatedAt: -1 }); 
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single TODO by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, userId: req.user._id });
    if (!todo) return res.status(404).json({ message: "TODO not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a TODO
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      {
        title,
        description,
        updatedAt: new Date(), 
      },
      { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ message: "TODO not found" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a TODO
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });
    if (!deletedTodo)
      return res.status(404).json({ message: "TODO not found" });
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
