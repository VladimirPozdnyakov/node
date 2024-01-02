import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

const db = new sqlite3.Database("./test.sqlite");
const sql =
  "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(255) NOT NULL, email TEXT(255) NOT NULL, password TEXT(20), age INTEGER NOT NULL)";

db.run(sql, (err) => {
  if (err) {
    console.log(err);
  }
});

class User {
  constructor() {}

  // static async create(dataForm, cb) {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     const hash = await bcrypt.hash(dataForm.password, salt);
  //     const sql1 =
  //       "INSERT INTO user (name, email, password, age) VALUES (?, ?, ?, ?)";
  //     db.run(sql1, dataForm.name, dataForm.email, hash, dataForm.age, cb);
  //   } catch (err) {
  //     cb(err);
  //   }
  // }

  static async create(dataForm, cb) {
    try {
      const sql1 =
        "INSERT INTO user (name, email, password, age) VALUES (?, ?, ?, ?)";
      db.run(
        sql1,
        dataForm.name,
        dataForm.email,
        dataForm.password,
        dataForm.age,
        cb
      );
    } catch (err) {
      cb(err);
    }
  }

  static findByEmail(email, cb) {
    db.get("SELECT * FROM user WHERE email = ?", email, cb);
  }

  static authenticate(dataForm, cb) {
    User.findByEmail(dataForm.email, async (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();

      const result = await bcrypt.compare(dataForm.password, user.password);
      if (result) {
        return cb(null, user);
      } else return cb();
    });
  }
}

export default User;
