// assingments
// 0010 0111 00001 0101

const { Buffer } = require("buffer");

// const bufferInfo = Buffer.alloc(5); // total bits are 16
// // 2 bytes will be allocated

// bufferInfo[0] = 0x53;
// bufferInfo[1] = 0x61;
// bufferInfo[2] = 0x65;
// bufferInfo[3] = 0x65;
// bufferInfo[4] = 0x64;

const bufferInfo = Buffer.from("saeed", "utf-8"); // is equal to Buffer [73,61,65,65,64]

const bufferStr = Buffer.from("7361656564", "hex"); // is equal to saeed
console.log(bufferInfo);

console.log(bufferStr.toString("utf-8"));
