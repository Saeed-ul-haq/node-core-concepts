const net = require("net");

const server = net.createServer();

// specific port and IP address for AWS EC2 instance

const PORT = 4020;
const ADDRESS = "172.31.47.134"; // Private IP address
// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");
  const clientId = clients.length + 1;

  // broadcast message when someone joined the room
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined`);
  });
  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    const dataStr = data.toString("utf-8");
    const [id, msgParts] = dataStr.split("-message-");
    clients.map((client) => {
      client.socket.write(`> user ${id}: ${msgParts} `);
    });
  });

  // broadcast message when someone left the room

  socket.on("end", () => {
    const index = clients.findIndex((client) => client.id === clientId);
    if (index !== -1) clients.splice(index, 1);
    clients.map((client) => {
      client.socket.write(`User  ${clientId} left`);
    });
  });

  clients.push({ id: clientId, socket });
});

server.listen(PORT, ADDRESS, () => {
  console.log("opened server on", server.address());
});
