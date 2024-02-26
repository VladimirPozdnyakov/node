import mysql from "mysql";
import "dotenv/config.js";
import logger from "../logger/index.js";

// Создание подключения к БД
const connection = mysql.createConnection({
  host: "sql11.freemysqlhosting.net", // Имя хоста БД
  port: "3306", // Порт хоста ДБ
  user: process.env.MYSQL_USER, // Имя пользователя БД
  password: process.env.MYSQL_PASSWORD, // Пароль пользователя БД
  database: process.env.MYSQL_DATABASE, // Имя БД
});

// Подключение к БД
connection.connect((err) => {
  if (err) throw err;
  console.log("...");
  console.log("Соединение с БД установлено!");
  console.log("...");
  logger.info("произведено соеденение с базой данных");

  let sql =
    "CREATE TABLE IF NOT EXISTS posts( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body TEXT,author VARCHAR(255) DEFAULT 'guest')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  sql =
    "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50), age INT NOT NULL, role VARCHAR(50) DEFAULT 'user')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
});

// Экспорт подключения для использования в других модулях
export default connection;
