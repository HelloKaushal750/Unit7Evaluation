const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const {userController} = require("./routes/user.routes");
const {todoController} = require("./routes/todo.routes")
const {authenticate} = require("./middlewares/authenticate")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users",userController);

app.use(authenticate)

app.use("/todos",todoController);


connection.then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Connected to Database");
  });
});
