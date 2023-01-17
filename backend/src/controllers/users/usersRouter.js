const express = require("express");
const User = require("../../models/User");
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});

module.exports = usersRouter;
