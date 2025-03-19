const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://next-chat-client-to1b.onrender.com", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (message) => {
    console.log("Message received:", message); 
    io.emit("chatMessage", message); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
