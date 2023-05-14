const express = require("express");
const router = express.Router();
const todos = require("./public/todos.json");

// get all todos
router.get("/", (req, res) => {
  res.send(todos);
});

function checkId(req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).send("Error  ID is not provided in the request");
  }
  next();
}

// get todo with id
router.get("/:id", checkId, (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send(` Error 404 todo with id ${id} is not found`);
  }
});

// delete todo with id
router.delete("/:id", checkId, (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    const newTodos = todos.filter((todo) => todo.id != id);
    res.sendStatus(410);
  } else {
    res.status(404).send(` Error 404 todo with id ${id} is not found`);
  }
});

// post a new todo

function checkProperties(req, res, next) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .send("Error Task title and description cannot be empty");
  }
  next();
}

router.post("/:id", checkProperties, (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);
  const body = req.body;
  const { title, description, completed } = body;
  if (todo) {
    res.status(403).send(` Error 403 todo with id ${id} is  already exists`);
  } else {
    const newTodo = {
      id: id,
      title: title,
      description: description,
      completed: completed,
    };
    todos.push(newTodo);
    res.sendStatus(201);
  }
});

// eddit existed todo 201
router.put("/:id", checkId, (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);
  const todoIndex = todos.findIndex((todo) => todo.id == id);
  if (todo) {
    const body = req.body;
    const { title, description, completed } = body;
    todos[todoIndex].title = title;
    todos[todoIndex].description = description;
    todos[todoIndex].completed = completed;
    res.json(todos[todoIndex]);
  } else {
    res.status(404).send(` Error 404 todo with id ${id} is  Not Found`);
  }
});

module.exports = router;
