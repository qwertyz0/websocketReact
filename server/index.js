/** socket.io is like full stack project that need 'cors' for communicate with frontend 
Also use express and http lib for creating server
*/
const PORT = 3001;
//instance import
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

//creating new server with http
const server = http.createServer(app);

//wrap created server in socket.io lib for connecting with frontend, and use cors for avoid conflicts
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected to server`);

  socket.on("enter_room", (dataRoom) => {
    socket.join(dataRoom);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`server starting on port ${PORT} ...`);
});
