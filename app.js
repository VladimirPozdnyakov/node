const path = require("path");
const fs = require("fs");
const { log } = require("console");
// console.log("Название файла: ", path.basename(__filename));
// console.log("Путь: ", path.dirname(__filename));
// console.log("Расширение: ", path.extname(__filename));
// fs.mkdir(path.join(__dirname, "tmp"), function (err) {
//   if (err) throw err;
//   console.log("Папка создана");
// });

const filePath = path.join(__dirname, "tmp", "2.txt");
console.log(filePath);

// fs.writeFile(filePath, "Something wrong in you file", function (err) {
//   if (err) throw err;
//   console.log("Файл создан");
// });

fs.appendFile(filePath, "tmp", function (err) {
  if (err) throw err;
  console.log("Файл изменён");
});

fs.readFile(filePath, "UTF-8", (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});
