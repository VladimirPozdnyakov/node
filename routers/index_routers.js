import express from "express";
import favicon from "express-favicon";
import { dirname } from "path";
import { fileURLToPath } from "url";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import login from "../controllers/login.js";
import posts from "../controllers/posts.js";
import sqlLogic from "../middleware/sqlLogic.js";
import logger from "../logger/index.js";
import passport from "passport";
import ensureAuthenticated from "../middleware/isAuthenticated.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.get("/entries", entries.form, (req, res) => {
  posts.getPosts((err, posts) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка захода на страницу");
      console.log(err.message);
    } else {
      res.render("main", {
        title: "Главная страница",
        posts: posts,
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

router.get("/new", posts.form);
router.post("/new", posts.addPost);

router.get("/posts/edit/:id", sqlLogic.edit);
router.post("/posts/edit/:id", sqlLogic.update);
router.get("/posts/delete/:id", sqlLogic.deleted);

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

router.get("/auth/vkontakte", passport.authenticate("vkontakte"));
router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
