const fs = require("node:fs/promises");

(async () => {
  // 8bits => 1 byte
  // 1024 bytes => 1 kilobyte
  // 1024 kilobytes => 1 megabyte

  console.time("writeMany");
  try {
    const fileHandle = await fs.open("text-large-2.txt", "w");
    // await fileHandle.writeFile("Hello World");
    const stream = fileHandle.createWriteStream();

    const numberOfWrites = 100000000;
    let i = 0;
    const writeMany = () => {
      // stream.write("\n");
      while (i < numberOfWrites) {
        const buff = Buffer.from(`${i} `, "utf-8");

        if (i === numberOfWrites - 1) {
          return stream.end(buff);
        }
        if (!stream.write(buff)) break;
        i++;
      }
    };

    writeMany();

    stream.on("drain", () => {
      writeMany();
    });

    stream.on("finish", () => {
      console.timeEnd("writeMany");
    });

    // for (let index = 0; index <= 1000000; index++) {
    //   const buff = Buffer.from(` ${index} `, "utf-8");
    //   console.log(stream.write(buff));
    // }
    // console.log(stream.writableHighWaterMark, " <<: inner buffer size");
    // console.log(stream.writableLength);
  } catch (err) {
    if (err.code === "ENOENT") {
      // File doesn't exist, create it
      await fs.writeFile("test.txt", "Initial content", "utf8");
      console.log('File "test.txt" created with initial content.');
    } else {
      console.error("Error accessing file:", err);
    }
  }
})(); // <- closing parentheses here
