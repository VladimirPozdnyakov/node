import connection from "./db.js";

// Создание таблицы, если её нет
const sql =
  "CREATE TABLE IF NOT EXISTS users1 (id INT AUTO_INCREMENT PRIMARY KEY UNIQUE, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, patronymic VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50) NOT NULL, role VARCHAR(50) NOT NULL DEFAULT 'user')";

connection.query(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

class Entry {
  constructor() {}

  static create(data) {
    const sql =
      "INSERT INTO users1 (name, surname, patronymic, email, password) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [data.username, data.surname, data.patronymic, data.email, data.password],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  static selectAll(cb) {
    const sqlTracks = "SELECT * FROM tracks";
    const sqlUsers = "SELECT * FROM users1";

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
