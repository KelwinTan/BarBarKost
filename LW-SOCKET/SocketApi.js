var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on("connection", function(socket) {
  console.log("New Connection");
  io.emit("chat", "Hello my Friend");
  socket.on("newCliMessage", function(message) {
    io.emit("chat", message);
  });
  socket.on("newMessage", function(to_id, message) {
    console.log(message);
    io.emit(to_id, message);
  });
});

module.exports = socketApi;
