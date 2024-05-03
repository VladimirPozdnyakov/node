import connection from "./db.js";

// Создание таблицы, если её нет
const sql =
  "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50), age INT NOT NULL, role VARCHAR(50) DEFAULT 'user')";

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
    const sqlTracks = "SELECT * FROM tracks";
    const sqlUsers = "SELECT * FROM users";

    connection.query(sqlTracks, (err, tracks) => {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        connection.query(sqlUsers, (err, users) => {
          if (err) {
            console.log(err);
            cb(err, null);
          } else {
            cb(null, { tracks, users });
          }
        });
      }
    });
  }
}

export default Entry;
