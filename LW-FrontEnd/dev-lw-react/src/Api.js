import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000/");

function connect(cb) {
  socket.on("1", (from_id, msg) => {
    console.log(from_id + ":" + msg);
  });
}

function sendChat(to_id, msg) {
  console.log("Yujuuy" + to_id + " " + msg);
  socket.emit("sendchat", to_id, msg);
}
export { connect, sendChat, socket };
