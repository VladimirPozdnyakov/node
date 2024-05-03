import express from "express";
import favicon from "express-favicon";
import { dirname } from "path";
import { fileURLToPath } from "url";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import login from "../controllers/login.js";
import tracks from "../controllers/tracks.js";
import sqlLogic from "../middleware/sqlLogic.js";
import logger from "../logger/index.js";
import passport from "passport";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();
const upload = multer({ dest: "./uploads/" });

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.get("/entries", entries.form, (req, res) => {
  tracks.gettracks((err, tracks) => {
    if (err) {
      console.log("! ! !");
      logger.error("Ошибка захода на страницу");
      console.log(err.message);
    } else {
      res.render("main", {
        title: "Главная страница",
        tracks: tracks,
      });
    }
  });
});
router.post("/entries", entries.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/logout", login.logout);

router.get("/new", tracks.form);
router.post("/new", upload.any(), tracks.addTrack);

router.get("/tracks/edit/:id", sqlLogic.edit);
router.post("/tracks/edit/:id", sqlLogic.update);
router.get("/tracks/delete/:id", sqlLogic.deleted);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res, next) {}
);

router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/login" }),
  function (req, res, next) {
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  function (req, res, next) {}
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res, next) {
    res.redirect("/");
  }
);

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default router;
