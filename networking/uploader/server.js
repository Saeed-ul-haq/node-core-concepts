const net = require("net");
const fs = require("node:fs/promises");

const PORT = 5050;
const HOST = "::1";
const path = "./storage/test.txt";
const server = net.createServer();

server.on("connection", async (socket) => {
  console.log("A new connection has been made");
  const fileHandle = await fs.open(path, "w");
  const fileStream = fileHandle.createWriteStream();
  socket.on("data", async (data) => {
    console.log(fileStream.writableHighWaterMark);
    fileStream.write(data);
    // write return false if buffers is full
  });

  socket.on("end", () => {
    fileHandle.close();
    console.log("Connectionn closed ");
  });
});

server.listen(PORT, HOST, (add) => {
  console.log("Server is runnning on at", server.address());
});
