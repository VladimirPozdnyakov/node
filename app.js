import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ejs from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const currentTime = new Date().toLocaleString();

app.set("view engine", "ejs");
app.set("\view", __dirname + "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(favicon(join(__dirname, "/public/favicon.png")));

app.use(
  "/bootstrap.css",
  express.static(
    join(__dirname, "./public/css/bootstrap-5.3.2/dist/css/bootstrap.min.css")
  )
);
app.use(
  "/bootstrap.js",
  express.static(
    join(__dirname, "./public/css/bootstrap-5.3.2/dist/js/bootstrap.min.js")
  )
);

function addLine(line) {
  line = `${currentTime} :: Логгируем ping по адресу: localhost:3000` + line;
  fs.appendFile(__dirname + "/logs/logger.txt", line + "\n", function (err) {
    if (err) console.log(err);
  });
}

app.get("/", (req, res) => {
  res.end("dea ex machina");
  addLine("/");
});

app.get("/as", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  addLine("/as");
});

app.get("/test", (req, res) => {
  res.end("deus (dea is better) ex machina");
  addLine("/test");
});

app.post("/as", (req, res) => {
  console.log("Проверка post пройдена");
  console.log(req.body);
  res.end("! !.. !!! ? ?.. ??? ?!");
});

app.listen(port, () => {
  addLine(" Server started");
});

// * error handler
app.use((req, res, next) => {
  const err = new Error("asd");
  err.status = 404;
  console.log(err);
  next(err);
});

// * production error handler
app.get("env") == "production";
console.log(app.get("env"));
if (app.get("env") == "production") {
  app.use((err, req, res) => {
    res.status(err.status);
    res.send(err.message);
  });
}

if (app.get("env") != "development") {
  app.use((err, req, res, next) => {
    res.status = 404;
    res.render("error.ejs", err);
  });
} else {
  app.use((err, req, res, next) => {
    res.status = 404;
    console.log("Development");
    console.log(res.status + " Not Found");
    console.log("Твой код — U+1FA7C");
    res.end("SHIT CODE - U+1FA7C");
  });
}
