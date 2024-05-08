import connection from "../models/db.js";
import logger from "../logger/index.js";
import fs from "fs";
import path from "path";

const sql =
  "CREATE TABLE IF NOT EXISTS tracks( id INT PRIMARY KEY AUTO_INCREMENT, cover_name VARCHAR(255) NOT NULL, audiofile_name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, genre VARCHAR(50) NOT NULL, bpm DECIMAL(5, 0) NOT NULL, tone VARCHAR(7) NOT NULL, price VARCHAR(5) NOT NULL, author VARCHAR(255) NOT NULL)";

connection.query(sql, console.log);

const addTrack = (req, res) => {
  const { title, genre, bpm, tone, price } = req.body;
  const author = req.session.name
    ? req.session.name
    : req.session.passport.user.name;
  const cover = req.files[0];
  const audiofile = req.files[1];

  if (!cover || !audiofile || !title || !genre || !bpm || !tone || !price) {
    logger.error("Не заполнены все поля для выкладывания бита");
    return res.redirect("/");
  }

  const cover_name = cover.originalname;
  const audiofile_name = audiofile.originalname;

  const query =
    "INSERT INTO tracks (cover_name, audiofile_name, title, genre, bpm, tone, price, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [cover_name, audiofile_name, title, genre, bpm, tone, price, author],
    (error) => {
      if (error) {
        logger.error("Ошибка выкладывания бита", error.message);
        return res.redirect("/");
      }

      res.redirect("/");
      logger.info("Бит выложен by " + author);
    }
  );
};

const getTracks = (callback) => {
  const query = "SELECT * FROM tracks ORDER BY id DESC";
  connection.query(query, (error, results) => {
    if (error) {
      logger.error("Error", error.message);
      return callback(error, null);
    }

    callback(null, results);
    logger.info("Успешно выполнена операция получения треков");
  });
};

const updateTrack = (req, res) => {
  const { title, genre, bpm, tone, price } = req.body;

  if (!title || !genre || !bpm || !tone || !price) {
    logger.error("Не заполнены все поля для обновления бита");
    return res.redirect("/");
  }

  connection.query(
    "UPDATE tracks SET ? WHERE id = ?",
    [{ title, genre, bpm, tone, price }, req.params.id],
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
    "SELECT cover_name, audiofile_name FROM tracks WHERE id = ?",
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
    "DELETE FROM tracks WHERE id = ?",
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
  getTracks,
  updateTrack,
  deleteTrack,
};