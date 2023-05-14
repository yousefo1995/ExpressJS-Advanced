const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const todosRouter = require("./todosRouter");
app.use("/todos", todosRouter);

app.listen(port, () => console.log(`lissening to server ${port}`));
