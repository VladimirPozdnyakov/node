import { create } from "domain";
import express from "express";
import favicon from "express-favicon";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ejs from "ejs";
import pkg from "method-override";
const { MethodOverride } = pkg;
import register from "../controllers/register.js";
import entries from "../controllers/entries.js";
import login from "../controllers/login.js";
import posts from "../controllers/posts.js";
import connection from "../models/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.use(favicon(__dirname + "/favicon.ico"));

router.get("/", entries.list);

router.get("/logout", login.logout);

router.get("/entries", entries.form, (req, res) => {
  posts.getPosts((err, posts) => {
    if (err) {
      // Обработка ошибки
    } else {
      res.render("main", {
        title: "Главная страница",
        posts: posts,
      });
    }
  });
});
router.post("/entries", entries.submit);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/new", posts.form);
router.post("/new", posts.addPost);

router.get("/posts/edit/:id", (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      // обработайте ошибку
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.render("posts/edit", { post: results[0] });
    }
  });
});
router.post("/posts/edit/:id", (req, res) => {
  const sql = "UPDATE posts SET title = ?, body = ? WHERE id = ?";
  connection.query(
    sql,
    [req.body.title, req.body.body, req.params.id],
    (err, result) => {
      if (err) {
        // обработайте ошибку
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.redirect("/");
      }
    }
  );
});

export default router;
