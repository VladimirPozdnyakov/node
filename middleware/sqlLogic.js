import connection from "../models/db.js";
import mysql from "mysql";
import logger from "../logger/index.js";

const edit = (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка в работе sql операция select");
      console.log(err.message);
    } else {
      res.render("posts/edit", { post: results[0] });
      console.log("...");
      console.log("операция проведена успешно");
      console.log("...");
      logger.info("успешное выполнение операции sql select");
    }
  });
};
const update = (req, res) => {
  const sql = "UPDATE posts SET title = ?, body = ? WHERE id = ?";
  connection.query(
    sql,
    [req.body.title, req.body.body, req.params.id],
    (err, result) => {
      if (err) {
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        logger.error("Ошибка в работе sql операция update");
        console.log(err.message);
      } else {
        res.redirect("/");
        console.log("...");
        console.log("операция проведена успешно");
        console.log("...");
        logger.info("успешное выполнение операции sql update");
      }
    }
  );
};
const deleted = (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка в работе sql операция delete");
      console.log(err.message);
    } else {
      res.redirect("/");
      console.log("...");
      console.log("операция проведена успешно");
      console.log("...");
      logger.info("успешное выполнение операции sql delete");
    }
  });
};

export default { edit, update, deleted };
