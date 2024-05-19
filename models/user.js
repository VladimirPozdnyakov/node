import connection from "./db.js";
import logger from "../logger/index.js";

// Создание таблицы, если её нет
const sql =
  "CREATE TABLE IF NOT EXISTS users1 (id INT AUTO_INCREMENT PRIMARY KEY UNIQUE, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, patronymic VARCHAR(255), email VARCHAR(255) NOT NULL, password VARCHAR(50) NOT NULL, role VARCHAR(50) NOT NULL DEFAULT 'user')";

connection.query(sql, (err) => {
  if (err) {
    logger.error("Error");
    console.log(err.message);
  }
});

class User {
  constructor() {}

  static create(dataForm, cb) {
    const sql =
      "INSERT INTO users1 (name, surname, patronymic, email, password) VALUES (?, ?, ?, ?, ?)";
    const { name, surname, patronymic, email, password } = dataForm;
    connection.query(
      sql,
      [name, surname, patronymic, email, password],
      (err) => {
        if (err) {
          logger.error("Ошибка создания пользователя");
          console.log(err.message);
        }
        cb(err);
      }
    );
  }

  static findByEmail(email, cb) {
    const sql = "SELECT * FROM users1 WHERE email = ?";
    connection.query(sql, [email], (err, rows) => {
      if (err) {
        logger.error(err.message);
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
