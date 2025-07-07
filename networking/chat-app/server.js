const net = require("net");

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");
  const clientId = clients.length + 1;
  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    const dataStr = data.toString("utf-8");
    const [id, msgParts] = dataStr.split("-message-");
    clients.map((client) => {
      client.socket.write(`> user ${id}: ${msgParts} `);
    });
  });

  socket.on("end", () => {
    const index = clients.findIndex((client) => client.socket === socket);
    console.log(index, " idx of user closed");
    if (index !== -1) clients.splice(index, 1);
  });
  clients.push({ id: clientId, socket });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});
