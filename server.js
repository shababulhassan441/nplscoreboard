const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/NPL";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("newBall", (data) => {
    io.emit("updateScore", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start WebSocket server
httpServer.listen(3001, () => {
  console.log("WebSocket Server running on port 3001");
});
