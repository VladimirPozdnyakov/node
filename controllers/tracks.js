import connection from "../models/db.js";
import logger from "../logger/index.js";
import fs from "fs";
import path from "path";

const sql =
  "CREATE TABLE IF NOT EXISTS tracks1( id INT PRIMARY KEY AUTO_INCREMENT, cover_name VARCHAR(255) NOT NULL, audiofile_name VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, category VARCHAR(20) NOT NULL, status TINYINT NOT NULL DEFAULT 0)";

connection.query(sql, console.log);

const addTrack = (req, res) => {
  const { author, title, category } = req.body;
  const cover = req.files[0];
  const audiofile = req.files[1];

  if (!cover || !audiofile || !author || !title || !category) {
    logger.error("Не заполнены все поля для выкладывания пластинки");
    return res.redirect("/");
  }

  const cover_name = cover.originalname;
  const audiofile_name = audiofile.originalname;

  const query =
    "INSERT INTO tracks1 (cover_name, audiofile_name, author, title, category) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [cover_name, audiofile_name, author, title, category],
    (error) => {
      if (error) {
        logger.error("Ошибка выкладывания пластинки", error.message);
        return res.redirect("/");
      }

      res.redirect("/");
      logger.info("Пластинка выложена");
    }
  );
};

const updateTrack = (req, res) => {
  const { author, title, category } = req.body;

  if (!author || !title || !category) {
    logger.error("Не заполнены все поля для обновления пластинки");
    return res.redirect("/");
  }

  connection.query(
    "UPDATE tracks1 SET ? WHERE id = ?",
    [{ author, title, category }, req.params.id],
    (err, result) => {
      if (err) {
        logger.error("Ошибка в работе sql-операции update");
        console.log(err.message);
      } else {
        logger.info("Успешное выполнение sql-операции update");
        return res.redirect("/");
      }
    }
  );
};

const deleteTrack = (req, res) => {
  connection.query(
    "SELECT cover_name, audiofile_name FROM tracks1 WHERE id = ?",
    [req.params.id],
    (err, result) => {
      const track = result[0];
      const coverPath = path.join("./public/uploads/tracks/", track.cover_name);
      const audioPath = path.join(
        "./public/uploads/tracks/",
        track.audiofile_name
      );
      fs.unlink(coverPath, (err) => {
        if (err) {
          console.error(`Ошибка удаления файла: ${coverPath}`);
        }
      });
      fs.unlink(audioPath, (err) => {
        if (err) {
          console.error(`Ошибка удаления файла: ${audioPath}`);
        }
      });
    }
  );
  connection.query(
    "DELETE FROM tracks1 WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        logger.error("Ошибка в работе sql-операции delete");
        console.log(err.message);
      } else {
        res.redirect("/");
        logger.info("Успешное выполнение sql-операции delete");
      }
    }
  );
};

export default {
  addTrack,
  updateTrack,
  deleteTrack,
};
