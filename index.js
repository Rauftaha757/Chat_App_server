const { connect } = require("mongoose");
const DBConnect = require("./src/config/database");
const app = require("./app");
require("dotenv").config();
const http = require("http");
const setupSocket = require("./src/sockets/sockets");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Setup socket.io
const io = setupSocket(server);

DBConnect().then(() => {
  server.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on ${PORT}`);
  });
});
