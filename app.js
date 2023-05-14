
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const todosRouter = require("./todosRouter");
app.use("/todos", todosRouter);

app.listen(port, () => console.log(`lissening to server ${port}`));
