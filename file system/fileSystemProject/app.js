const fs = require("fs/promises");

(async () => {
  // create a file
  const create = async (path) => {
    let checkIFFileExist;
    try {
      // we want to check if the smae file exists already
      checkIFFileExist = await fs.open(path, "r");
      checkIFFileExist.close();
      return console.log(`The file ${path} already exists. `);
    } catch (error) {
      // create the file if can't find in that location
      const newFileHanlde = await fs.open(path, "w");
      console.log("the file has been successfully created");
      newFileHanlde.close();
    }
  };

  const deleteFile = async (filePath) => {
    try {
      await fs.unlink(filePath);
      console.log(`File ${filePath} deleted successfully.`);
      return true;
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`File ${filePath} does not exist 😢.`);
      } else {
        console.error(`Error deleting file: ${error.message}`);
      }
      return false;
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log("The file was successfully renamed.");
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(
          "No file at this path to rename, or the destination doesn't exist."
        );
      } else {
        console.log("An error occurred while removing the file: ");
        console.log(e);
      }
    }
  };
  const addToFile = async (path, content) => {
    try {
      const fileHandle = await fs.open(path, "a");
      await fileHandle.write(content);
      console.log("file has successfuylly changed");
      await fileHandle.close();
    } catch (error) {
      console.log("An error occured while removing the file");
    }
  };
  // commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  const commandFile = await fs.open("./command.txt", "r");

  commandFile.on("change", async () => {
    // get the size of file
    const fileSize = (await commandFile.stat()).size;
    // allocate the buffer for
    const buff = Buffer.alloc(fileSize);
    // the location at which we want to start filling our buffer
    const offset = 0;
    // the position from which we start reading the file from
    const position = 0;
    // how many bytes we want to read
    const length = buff.byteLength;
    // we also want to read the whole content of file (from beginning all the way to the end)
    const fileContent = await commandFile.read(buff, offset, length, position);

    // console.log("file Content =>> ", fileContent.buffer.toString("utf-8"));
    const command = fileContent.buffer.toString("utf-8");

    // create file
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      create(filePath);
      // create(filePath);
    }

    // delete file
    else if (command.includes(DELETE_FILE)) {
      const filepath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filepath);
    }

    // rename file
    else if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath);
    }

    // add to file:
    // add to the file <path> this content: <content>
    else if (command.includes(ADD_TO_FILE)) {
      const idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, idx);
      const fileContent = command.substring(idx + 15);
      debugger;
      addToFile(filePath, fileContent);
    }

    // 2nd method of to show th econtetn of file
    // console.log("file Content =>> ", buff.toString("utf-8"));
  });
  // catch all the chanbges in directroy
  const watchers = fs.watch("./command.txt");

  for await (const event of watchers) {
    if (event.eventType === "change") {
      commandFile.emit("change");
    }
  }
})();
