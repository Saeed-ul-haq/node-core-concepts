const fileSystem = require("fs");
const os = require("os");
const { Buffer } = require("buffer");

console.log(os.cpus().length);
const arr = [2, 3, 4, 56, 10];
// fileSystem.writeFile(
//   "./testing.txt",
//   "<p>Saeedul haq is a software engineer</p>",
//   (res) => {
//     console.log(res, "RESPONSE AFTER FILE UPLOAD ...");
//   }
// );

// const fileContent = fileSystem.readFileSync("./myInfo.txt", "utf-8");

// console.log("READ FILE CONTENT \n", fileContent);

// fileSystem.appendFileSync("./myInfo.txt", "\n Hi there to saeed websote");

// fileSystem.cpSync("./myInfo.txt", "./new/copy1.txt");
// console.log(fileSystem.statSync('./myInfo.txt'))

const buffeInfo = Buffer.alloc(10);
buffeInfo[0] = 0xf2;
console.log(buffeInfo);
console.log(buffeInfo[0]);
