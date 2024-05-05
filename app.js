import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import myRoutes from "./routers/index_routers.js";
import session from "express-session";
import user_session from "./middleware/user_session.js";
import logger from "./logger/index.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportFunctionGithub from "./middleware/passport_github.js";
import passportFunctionYandex from "./middleware/passport_yandex.js";
import passportFunctionGoogle from "./middleware/passport_google.js";
import passportFunctionJWT from "./middleware/passport_jwt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;
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
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(favicon(join(__dirname, "/public/img/logo.ico")));
app.use(user_session);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportFunctionGithub(passport);
passportFunctionJWT(passport);
passportFunctionYandex(passport);
passportFunctionGoogle(passport);
app.use(myRoutes);

app.listen(port, () => {
  console.log("В данный момент используется версия " + app.get("env"));
  logger.info("Запуск сервера");
});

//production error handler
app.get("env") == "production";
console.log("переход на " + app.get("env"));

if (app.get("env") != "development") {
  app.use((err, req, res, next) => {
    // err.status = 400;
    res.render("error.ejs", { error: err.message, status: err.status });
    logger.error(err.message);
  });
} else {
  app.use((err, req, res, next) => {
    res.status = 404;
    console.log("Ошибка: " + res.status);
  });
}
