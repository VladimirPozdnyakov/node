import connection from "../models/db.js";
import mysql2 from "mysql2";
import logger from "../logger/index.js";

const edit = (req, res) => {
  const sql = "SELECT * FROM tracks WHERE id = ?";
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
      res.render("tracks/edit", { post: results[0] });
      console.log("...");
      console.log("операция проведена успешно");
      console.log("...");
      logger.info("успешное выполнение операции sql select");
    }
  });
};
const update = (req, res) => {
  const sql =
    "UPDATE tracks SET title = ?, genre = ?, bpm = ?, tone = ?,  WHERE id = ?";
  connection.query(
    sql,
    [
      req.body.title,
      req.body.genre,
      req.body.bpm,
      req.body.tone,
      req.params.id,
    ],
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
  const sql = "DELETE FROM tracks WHERE id = ?";
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
