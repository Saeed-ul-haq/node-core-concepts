const net = require("net");
const fs = require("node:fs/promises");

const PORT = 5050;
const HOST = "::1";
const path = "./storage/test.txt";
const server = net.createServer();

server.on("connection", async (socket) => {
  console.log("A new connection has been made");
  const fileHandle = await fs.open(path, "w");
  const fileWriteStream = fileHandle.createWriteStream();

  socket.on("data", async (data) => {
    if (!fileWriteStream.write(data)) {
      socket.pause();
    }
  });

  fileWriteStream.on("drain", () => {
    socket.resume();
  });

  const cleanup = () => {
    fileHandle.close();
    console.log("Connection closed");
  };

  socket.on("end", cleanup);
  socket.on("error", cleanup);
  fileWriteStream.on("error", cleanup);
});

server.listen(PORT, HOST, (add) => {
  console.log("Server is runnning on at", server.address());
});
