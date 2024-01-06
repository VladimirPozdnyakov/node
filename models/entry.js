import connection from "./db.js";

// Создание таблицы, если её нет
const sql =
  "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50), age INT NOT NULL, role VARCHAR(50) DEFAULT 'user')";

connection.query(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

class Entry {
  constructor() {}

  static create(data) {
    const sql =
      "INSERT INTO user (name, email, password, age, role) VALUES (?, ?, ?, ?, 'user')";
    connection.query(
      sql,
      [data.username, data.email, data.password, data.age],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  static selectAll(cb) {
    const sql = "SELECT * FROM user";
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, rows);
      }
    });
  }
}

export default Entry;
