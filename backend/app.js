const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const db = require("./src/constants/db");
const mainRouter = require("./src/controllers/main");
const ChatRoom = require("./src/models/ChatRoom");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("CHAT_MESSAGE_REQ", (payload) => {
    console.log(payload);
  });
});

server.listen(3000, () => {
  console.log("Listening socket on *:3000");
});

app.listen(3001, () => {
  console.log("Running API from *:3001");
});

app.use("/api", mainRouter);

try {
  db.authenticate();
  db.sync({ alter: true });
  console.log("Database connected");
} catch (error) {
  console.log(error);
}
