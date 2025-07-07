const { Buffer } = require("buffer");

const large_allocation = Buffer.alloc(4e9);
setTimeout(() => {
  for (let index = 0; index < large_allocation.length; index++) {
    large_allocation[index] = 0x22;
  }
  console.log(large_allocation);
}, 1000);

// new method of allocating buffer

const newBuffer = Buffer.alloc(1000, 0x1);

console.log("neew buffer allocated faster", newBuffer);
