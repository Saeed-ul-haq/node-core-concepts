// client.js
const net = require("net");

// Create a connection to the server
const client = net.createConnection({ port: 3000, host: "127.0.0.1" }, () => {
  console.log("Connected to server");
  const buff = Buffer.alloc(3);
  buff[1] = 23;
  buff[0] = 21;
  // Send a message to the server
  //   client.write("Hello from client 👋");
  client.write(buff);
});

// Handle data received from the server (if any)
client.on("data", (data) => {
  console.log("Received from server:", data.toString());
});

// Handle connection close
client.on("end", () => {
  console.log("Disconnected from server");
});

client.on("error", (err) => {
  console.error("Client error:", err.message);
});
