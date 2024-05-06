import express from "express";
import favicon from "express-favicon";
import { dirname } from "path";
import { fileURLToPath } from "url";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import login from "../controllers/login.js";
import tracks from "../controllers/tracks.js";
import logger from "../logger/index.js";
import passport from "passport";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/tracks/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.post("/register", register.submit);

router.post("/login", login.submit);

router.get("/logout", login.logout);

router.post("/new", upload.any(), tracks.addTrack);

router.post("/edit/tracks/:id", upload.any(), tracks.updateTrack);
router.get("/edit/tracks/delete/:id", tracks.deleteTrack);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res, next) {}
);

router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/" }),
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
    failureRedirect: "/",
  }),
  function (req, res, next) {
    res.redirect("/");
  }
);

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

export default router;
