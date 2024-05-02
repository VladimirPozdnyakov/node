import connection from "../models/db.js";
import logger from "../logger/index.js";

const form = (req, res) => {
  res.render("./partials/tracks/newModal", {
    title: "Выложить бит",
    errorMessage: res.locals.errorMessage,
  });
};

const sql =
  "CREATE TABLE IF NOT EXISTS tracks( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, genre VARCHAR(50) NOT NULL, bpm DECIMAL(5, 2) NOT NULL, tone DECIMAL(5, 2) NOT NULL, author VARCHAR(255) DEFAULT 'guest')";

connection.query(sql, console.log);

const addPost = (req, res) => {
  const { title, genre, bpm, tone } = req.body;
  const author = req.session.email
    ? req.session.email
    : req.session.passport.user.email;

  if (!title || !genre || !bpm || !tone) {
    logger.error("Не заполнены поля для выкладывания бита");
    return res.redirect("/");
  }

  const query =
    "INSERT INTO tracks (title, genre, bpm, tone, author) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [title, genre, bpm, tone, author], (error) => {
    if (error) {
      logger.error("Ошибка выкладывания бита", error.message);
      return res.redirect("/");
    }

    res.redirect("/");
    logger.info("Бит выложен by " + author);
  });
};

const gettracks = (callback) => {
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

export default { form, addPost, gettracks };
