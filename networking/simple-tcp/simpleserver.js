const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log("Data coming is: ", data.toString("utf-8"));
  });
});

server.listen(3000, "127.0.0.1", () => {
  //// ✅ Loopback address
  console.log("Server running on ", server.address());
});

server.on("error", (err) => {
  console.error("Client error:", err.message);
});
