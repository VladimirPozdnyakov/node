import connection from "./db.js";
import logger from "../logger/index.js";

// Создание таблицы, если её нет
const sql =
  "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50), role VARCHAR(50) DEFAULT 'user')";

connection.query(sql, (err) => {
  if (err) {
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Error");
    console.log(err.message);
  }
});

class User {
  constructor() {}

  static create(dataForm, cb) {
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
    const { name, email, password } = dataForm;
    connection.query(sql, [name, email, password], (err) => {
      if (err) {
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        logger.error("Ошибка создания пользователя");
        console.log(err.message);
      }
      cb(err);
    });
  }

  static findByEmail(email, cb) {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], (err, rows) => {
      if (err) {
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        logger.error("Error");
        console.log(err.message);
        cb(err, null);
      } else {
        cb(null, rows[0]);
      }
    });
  }

  static authenticate(dataForm, cb) {
    User.findByEmail(dataForm.email, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      if (dataForm.password === user.password) {
        return cb(null, user);
      } else return cb();
    });
  }
}

export default User;
