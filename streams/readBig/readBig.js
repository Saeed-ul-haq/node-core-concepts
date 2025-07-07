const fs = require("node:fs/promises");

(async () => {
  const ReadFileHandeled = await fs.open("text-gigantic.txt", "r");

  const fileHandleWritee = await fs.open("text.txt", "w");

  const readFileStream = ReadFileHandeled.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const writeFileStream = fileHandleWritee.createWriteStream();

  let split = "";

  readFileStream.on("data", (chunk) => {
    console.log("============== Start of Chunk ==============");

    const numbers = chunk.toString("utf-8").split("  ");

    if (Number(numbers[0]) + 1 !== Number(numbers[1])) {
      // pop the last element of array & store it in split
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
        // split = "";
      }
    }

    // compare the first and second number of array if their diff is greater than 1 then and add the split into it and add with the prev split
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    console.log(numbers);
    if (!writeFileStream.write(chunk)) {
      readFileStream.pause();
    }
  });

  writeFileStream.on("drain", () => {
    readFileStream.resume();
  });

  readFileStream.on("end", () => {
    console.log("================= END OF FILE  READING =================");
  });
})();

// const fs = require("node:fs/promises");

// (async () => {
//   const ReadFileHandeled = await fs.open("text-gigantic.txt", "r");

//   const fileHandleWritee = await fs.open("dest.txt", "w");

//   const readFileStream = ReadFileHandeled.createReadStream({
//     highWaterMark: 64 * 1024,
//   });
//   const writeFileStream = fileHandleWritee.createWriteStream();
//   readFileStream.on("data", (chunk) => {
//     console.log("============== Start of Chunk ==============");
//     if (!writeFileStream.write(chunk)) {
//       readFileStream.pause();
//     }
//     console.log(chunk.length);
//   });

//   writeFileStream.on("drain", () => {
//     readFileStream.resume();
//   });

//   readFileStream.on("end", () => {
//     console.log("================= END OF FILE =================");
//   });
// })();
