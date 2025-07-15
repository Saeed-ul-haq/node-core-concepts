const net = require("net");
const fs = require("node:fs/promises");

const PORT = 5050;
const HOST = "::1";
const server = net.createServer();
let fileHandle, fileWriteStream;

server.on("connection", async (socket) => {
  console.log("A new connection has been made");

  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause(); // pause receiving data from the client
      const indexOfSeparator = data.indexOf("------");
      const fileName = data.subarray(10, indexOfSeparator).toString("utf-8");
      fileHandle = await fs.open(`storage/${fileName}`, "w");
      fileWriteStream = fileHandle.createWriteStream(); // the stream to write to our file
      fileWriteStream.write(data.subarray(indexOfSeparator + 6));
      socket.resume();

      fileWriteStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    }
  });

  const cleanup = () => {
    fileHandle.close();
    console.log("Connection closed");
  };

  socket.on("end", () => {
    fileHandle && fileHandle.close();
    fileHandle = undefined;
    fileWriteStream = undefined;
    console.log("Connection closed");
  });

  socket.on("error", cleanup);
});

server.listen(PORT, HOST, (address) => {
  console.log("Server is runnning on at", server.address());
});
