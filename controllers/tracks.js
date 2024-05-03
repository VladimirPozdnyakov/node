import connection from "../models/db.js";
import logger from "../logger/index.js";
import multer from "multer";

const form = (req, res) => {
  res.render("./partials/tracks/newModal", {
    title: "Выложить бит",
    errorMessage: res.locals.errorMessage,
  });
};

const sql =
  "CREATE TABLE IF NOT EXISTS tracks( id INT PRIMARY KEY AUTO_INCREMENT, cover_name VARCHAR(255) NOT NULL, audiofile_name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, genre VARCHAR(50) NOT NULL, bpm DECIMAL(5, 0) NOT NULL, tone DECIMAL(5, 0) NOT NULL, author VARCHAR(255) DEFAULT 'guest')";

connection.query(sql, console.log);

const addTrack = (req, res) => {
  const { title, genre, bpm, tone } = req.body;
  const author = req.session.email
    ? req.session.email
    : req.session.passport.user.email;
  const cover = req.files[0];
  const audiofile = req.files[1];

  if (!cover || !audiofile || !title || !genre || !bpm || !tone) {
    logger.error("Не заполнены поля для выкладывания бита");
    return res.redirect("/");
  }

  const cover_name = cover.originalname;
  const audiofile_name = audiofile.originalname;

  const query =
    "INSERT INTO tracks (cover_name, audiofile_name, title, genre, bpm, tone, author) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [cover_name, audiofile_name, title, genre, bpm, tone, author],
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

export default { form, addTrack, getTracks };
