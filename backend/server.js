const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { addMessage } = require("./controllers/messageControllers");
const { time } = require("console");
const { send } = require("process");
const path = require("path");

// dotenv in our server.js
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "DELETE"] },
});
const PORT = process.env.PORT || 5000; //local port

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes in server.js
app.use("/api/messages", require("./routes/messageRoutes"));

//root route
app.get("/", (req, res) => {
  res.json({
    message: "Chat API server",
    version: "1.0.0",
    endpoints: {
      getMessages: "Get /api/messages",
      createMessages: "POST /api/messages",
      deleteAllMessages: "DELETE api/messages",
      testClient: "GET /index.html",
    },
  });
});

// Serve React build at /react (after building it)
app.use("/react", express.static(path.join(__dirname, "../frontend/build")));
app.get("/react/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // Welcome the new user (only them)
  socket.emit("message", {
    user: "System",
    text: "Welcome to the chat!",
    timestamp: new Date().toISOString(),
  });

  // Tell everyone else someone joined
  socket.broadcast.emit("message", {
    user: "System",
    text: "A new user has joined the chat!",
    timestamp: new Date().toISOString(),
  });

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    // Add message to database
    const newMessage = addMessage(data);

    // Broadcast message to all connected clients
    io.emit("receiveMessage", newMessage);
  });

  // Typing indicator
  socket.on("typing", (data) => {
    socket.broadcast.emit("userTyping", data); // MATCHES frontend
  });
  // handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Notify others that user left
    io.emit("message", {
      user: "System",
      text: "A user has left the chat.",
      timestamp: new Date().toISOString(),
    });
  });
});
// //test route
// app.get('/test',(req,res)=>{
//     res.json({
//         message: "This is a test route",
//         timestamp: new Date(),
//         status: "success"
//     })
// })

// Error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
