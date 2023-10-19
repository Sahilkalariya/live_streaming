const socketIo = require("socket.io");
require("dotenv").config();
exports.init = (app) => {
  const server = require("http").Server(app);
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room); // Join a room based on the video ID or room name
    });

    socket.on("comment", (data) => {
      // Get the room associated with the comment
      const room = data.room;

      // Broadcast the comment to all clients in the room
      io.to(room).emit("comment", { comment: data.comment, user: data.user });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  // exports.server = server;
  server.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
};
