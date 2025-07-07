// client.js
const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursorUp = (lines = -1) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(0, lines, () => {
      resolve();
    });
  });
};
let id;

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    console.log("Connected to the server!");
    const ask = async () => {
      const message = await rl.question("Enter a message > ");
      // move the cursor one linne up
      await moveCursorUp(-1);
      // clear the line
      await clearLine(0);
      socket.write(`${id}-message-${message}`);
    };
    ask();

    socket.on("data", async (data) => {
      console.log();
      await moveCursorUp(-1);
      await clearLine(0);
      if (data.toString("utf-8").substring(0, 3) === "id-") {
        // when we are getting the id-
        id = data.toString("utf-8").substring(3);
        console.log(`Your id is ${id}\n`);
      } else {
        // when we are  getting the message
        console.log(data.toString("utf-8"));
      }
      ask();
    });
  }
);

// Handle connection errors
socket.on("error", (err) => {
  console.error("Connection error:", err.message);
  console.log("Make sure the server is running on port 3000");
  process.exit(1);
});

socket.on("end", () => {
  console.log("Connection was ended!");
  process.exit(0);
});
