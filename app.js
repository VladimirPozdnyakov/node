import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ejs from "ejs";
import myRoutes from "./routers/index_routers.js";
import session from "express-session";
import user_session from "./middleware/user_session.js";
import User from "./models/user.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = "3000";
const currentTime = new Date().toLocaleString();

app.set("view engine", "ejs");
app.set("\views", __dirname + "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(
  "/bootstrap.css",
  express.static(
    join(__dirname, "public/css/bootstrap-5.3.2/dist/css/bootstrap.css")
  )
);
app.use("publics", express.static(join(__dirname, "public/")));
app.use(
  "/bootstrap.js",
  express.static(
    join(__dirname, "public/css/bootstrap-5.3.2/dist/js/bootstrap.js")
  )
);
app.use(session({ secret: "TenSura", resave: false, saveUninitialized: true }));

let guestUser = null;

// Создаем пользователя-гостя при старте приложения
User.create(
  {
    name: "Guest",
    email: "guest@example.com",
    password: "guest",
    age: 0,
    role: "guest",
  },
  (err, user) => {
    if (err) {
      console.log(err);
    } else {
      guestUser = user;
    }
  }
);

app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = guestUser;
  }
  next();
});

app.use(favicon(join(__dirname, "/public/img/Fox(ElectroNic).ico")));
app.use(user_session);
app.use(myRoutes);

app.listen(port, () => {
  console.log("...");
  console.log("проверка console.log пройдена");
  console.log("...");
  console.log("начинается логгирование");
  console.log("...");
  addline("server started");
  console.log("логгирование завершено");
  console.log("...");
  console.log("в данный момент используется версия " + app.get("env"));
});

function addline(line) {
  line = line + " timestamp: " + currentTime + "\n";
  fs.appendFile(__dirname + "/logger/logger.txt", line, (err) => {
    if (err) return console.log(err);
  });
}

// error handler
app.use((req, res, next) => {
  const err = new Error("какая-то непонятная ошибка");
  err.status = 404;
  next(err);
});

//production error handler
app.get("env") == "production";
console.log("переход на " + app.get("env"));

if (app.get("env") != "development") {
  app.use((err, req, res, next) => {
    // err.status = 400;
    res.render("error.ejs", { error: err.message, status: err.status });
  });
} else {
  app.use((err, req, res, next) => {
    res.status = 404;
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка " + res.status);
    console.log("! ! !");
    console.log(app.get);
    console.log("! ! !");
    console.log(err.message);
    res.end("GOVNOKOD!");
  });
}
