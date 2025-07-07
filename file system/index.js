const fs = require("fs");
const fileContent = fs.readFileSync("./file.txt");
console.log(fileContent.toString());
console.log(fileContent);

console.log(__filename);
console.log(__dirname);
