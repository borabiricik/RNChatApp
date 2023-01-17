const express = require("express");
const usersRouter = require("./users/usersRouter");
const mainRouter = express.Router();

mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
