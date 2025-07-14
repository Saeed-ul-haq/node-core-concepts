// client.js
const net = require("net");
const fs = require("node:fs/promises");
const path = require("node:path");
// specific port and IP address for AWS EC2 instance
const PORT = 5050;
const HOST = "::1";

const socket = net.createConnection({ host: HOST, port: PORT }, async () => {
  console.log("Connected to the server!");
  console.log("File is Reading ...");

  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  //Reading from the source file
  fs.open(filePath, "r")
    .then((fileHandle) => {
      const fileReadStream = fileHandle.createReadStream();
      socket.write(`fileName: ${fileName}------`);
      fileReadStream.on("data", (data) => {
        if (!socket.write(data)) {
          fileReadStream.pause();
        }
      });

      socket.on("drain", () => {
        fileReadStream.resume();
      });

      fileReadStream.on("end", () => {
        console.log("File read successfully!");
        socket.end();
      });
    })
    .catch((error) => {
      console.log(error.code, " ERROR");
    });
});

// Handle connection errors
socket.on("error", (err) => {
  console.error("Connection error:", err.message);
  console.log(`Make sure the server is running on port ${PORT}`);
  process.exit(1);
});
