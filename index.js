const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); // Corrected import for Socket.IO

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allows all origins; restrict if needed
    methods: ["GET", "POST"], // Specify allowed HTTP methods
  },
});

// Middleware
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listen for chat message
  socket.on('chat message', (message) => {
    console.log(`Message received: ${message}`);
    io.emit('chat message', message); // Broadcast to all connected clients
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
