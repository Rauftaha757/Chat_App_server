const { Server } = require("socket.io");
const http = require("http");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // connection to client
  io.on("connection", (socket) => {
    console.log("connected to socket:", socket.id);

    // disconnection with client
    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", socket.id, "Reason:", reason);
    });
  });

  return io;
};

module.exports = setupSocket;
