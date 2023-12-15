import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

const db = new sqlite3.Database("./test.sqlite");
const sql =
  "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT(255) NOT NULL, title TEXT(255) NOT NULL, content TEXT(200))";

db.run(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

class Entry {
  constructor() {}

  static create(data) {
    const sql = "INSERT INTO posts (userName, title, content) VALUES (?,?,?)";
    db.run(sql, data.username, data.title, data.content);
  }
  static selectall(cb) {
    db.all("SELECT * FROM user", cb);
  }
}

export default Entry;
