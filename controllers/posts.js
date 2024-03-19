import connection from "../models/db.js";
import logger from "../logger/index.js";

const form = (req, res) => {
  res.render("posts/new", {
    title: "Создать пост",
    errorMessage: res.locals.errorMessage,
  });
  console.log("...");
  console.log("заход на /new");
  console.log("...");
  logger.info("заход на страницу создания поста");
};

const sql =
  "CREATE TABLE IF NOT EXISTS posts( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body TEXT,author VARCHAR(255) DEFAULT 'guest')";

connection.query(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

const addPost = (req, res, next) => {
  const { title, body } = req.body;
  const author = req.session.email
    ? req.session.email
    : req.session.passport.user.email;

  if (!title || !body) {
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Все поля должны быть заполнены!");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Не заполнены поля для создания поста");
    res.redirect("/new");
    return;
  }

  let query = "INSERT INTO posts (title, body, author) VALUES (?, ?, ?)";
  connection.query(
    query,
    [title, body, author],
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
        logger.error("Ошибка создания поста");
      } else {
        res.redirect("/");
        console.log("...");
        console.log("успешное создание поста");
        console.log("...");
        logger.info("Пост создан" + " " + author);
      }
    }
  );
};

function getPosts(callback) {
  let query = "SELECT * FROM posts ORDER BY id DESC";
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

export default { form, addPost, getPosts };
