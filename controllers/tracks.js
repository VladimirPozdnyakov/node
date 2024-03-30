import connection from "../models/db.js";
import logger from "../logger/index.js";

const form = (req, res) => {
  res.render("tracks/new", {
    title: "Выложить бит",
    errorMessage: res.locals.errorMessage,
  });
  console.log("...");
  console.log("заход на /new");
  console.log("...");
  logger.info("заход на страницу выкладывания бита");
};

const sql =
  "CREATE TABLE IF NOT EXISTS tracks( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, genre VARCHAR(50) NOT NULL, bpm DECIMAL(5, 2) NOT NULL, tone DECIMAL(5, 2) NOT NULL, author VARCHAR(255) DEFAULT 'guest')";

connection.query(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

const addPost = (req, res, next) => {
  const { title, genre, bpm, tone } = req.body;
  const author = req.session.email
    ? req.session.email
    : req.session.passport.user.email;

  if (!title || !genre || !bpm || !tone) {
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Все поля должны быть заполнены!");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Не заполнены поля для выкладывания бита");
    res.redirect("/new");
    return;
  }

  let query =
    "INSERT INTO tracks (title, genre, bpm, tone, author) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [title, genre, bpm, tone, author],
    function (err, results, fields) {
      if (err) {
        console.log(err.message);
        res.redirect("/new");
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        logger.error("Ошибка выкладывания бита");
      } else {
        res.redirect("/");
        console.log("...");
        console.log("успешное выкладывание бита");
        console.log("...");
        logger.info("Бит выложен" + " " + author);
      }
    }
  );
};

function gettracks(callback) {
  let query = "SELECT * FROM tracks ORDER BY id DESC";
  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Error");
      console.log(err.message);
      callback(err, null);
    } else {
      callback(null, results);
      console.log("...");
      console.log("операция прошла успешно");
      console.log("...");
      logger.info("Успешно!");
    }
  });
}

export default { form, addPost, gettracks };
