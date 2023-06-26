const express = require("express");
const { TodoModel } = require("../models/Todo.model");

const todoController = express.Router();

todoController.get("/", async (req, res) => {
  const { taskname, status, tag } = req.query;
  if (taskname || status || tag) {
    if (taskname) {
      const todos = await TodoModel.find({
        userId: req.body.userId,
        taskname,
      });
      res.status(200).json(todos);
    } else if (status) {
      const todos = await TodoModel.find({
        userId: req.body.userId,
        status,
      });
      res.status(200).json(todos);
    } else if (tag) {
      const todos = await TodoModel.find({
        userId: req.body.userId,
        tag,
      });
      res.status(200).json(todos);
    }
  } else {
    const todos = await TodoModel.find({ userId: req.body.userId });
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(404).json({
        message:
          "Either you are not right user or you haven't created any todo's",
      });
    }
  }
});

todoController.get("/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const todos = await TodoModel.findOne({
    _id: todoId,
    userId: req.body.userId,
  });
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).json({
      message:
        "Either you are not right user or you haven't created any todo's",
    });
  }
});

todoController.post("/create", async (req, res) => {
  try {
    const { taskname, status, tag, userId } = req.body;
    const todo = new TodoModel({
      taskname,
      status,
      tag,
      userId,
    });
    await todo.save();
    res.status(200).json({ message: "Todo Created Successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

todoController.delete("/delete/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const deleteTodo = await TodoModel.findOneAndDelete({
      _id: todoId,
      userId: req.body.userId,
    });
    if (deleteTodo) {
      res.status(200).json({ message: "Todo deleted Successfully" });
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

todoController.patch("/update/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const updateTodo = await TodoModel.findOneAndUpdate(
      {
        _id: todoId,
        userId: req.body.userId,
      },
      { ...req.body }
    );
    if (updateTodo) {
      res.status(200).json({ message: "Todo updated Successfully" });
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = { todoController };
