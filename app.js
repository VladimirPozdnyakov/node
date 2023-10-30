import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = "3000";
const currentTime = new Date().toLocaleString();
const content = `${currentTime} : Логгируем ping по адресу: localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(favicon(join(__dirname, "/public/favicon.png")));

app.listen(port, () => {
  fs.access("logs/logs.txt", fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile("logs/logs.txt", content, (err) => {
        if (err) throw err;
      });
    } else {
      fs.appendFile("logs/logs.txt", `\n${content}`, (err) => {
        if (err) throw err;
      });
    }
  });
});

app.get("/as", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/test", (req, res) => {
  res.end("deus (dea is better) ex machina");
});

app.post("/as", (req, res) => {
  console.log("Проверка post пройдена");
  console.log(req.body);
  res.end("! !.. !!! ? ?.. ??? ?!");
});
