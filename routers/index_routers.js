import { create } from "domain";
import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ejs from "ejs";
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import login from "../controllers/login.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.get("/logout", login.logout);

router.get("/entries", entries.form);
router.post("/entries", entries.submit);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/as", (req, res) => {
  res.sendFile(__dirname + "/vremenno/index.html");
  console.log("...");
  console.log("заход на /as");
});
router.post("/as", (req, res) => {
  console.log("...");
  console.log("проверка post пройдена");
  console.log("...");
  console.log(req.body);
  console.log("password: " + req.body.pass);
  console.log("name: " + req.body.name);
  res.end("проверка post пройдена.");
});

router.get("/test", (req, res) => {
  res.end("deus ex machina");
  console.log("...");
  console.log("заход на /test");
});
router.post("/test", (req, res) => {
  console.log("...");
  console.log("проверка post пройдена");
  console.log("...");
  console.log(req.body);
  console.log(req.url);
  console.log("password: " + req.body.pass);
  console.log("name: " + req.body.name);
  res.end("проверка post пройдена.");
});

export default router;
// 0177 - ±
