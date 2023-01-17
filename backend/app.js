const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const db = require("./src/constants/db");
const mainRouter = require("./src/controllers/main");
const ChatRoom = require("./src/models/ChatRoom");
const io = new Server(server);

io.on("connection", async (socket) => {
  socket.on("CHAT_MESSAGE_REQ", (payload) => {
    socket.broadcast.emit("CHAT_MESSAGE_RES", {
      from: socket.id,
      data: { message: payload.data.message, userName: payload.data.userName },
    });
  });
});

server.listen(3000, () => {
  console.log("Listening socket on *:3000");
});
