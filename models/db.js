import mysql2 from "mysql2";
import "dotenv/config.js";
import logger from "../logger/index.js";

// Создание подключения к БД
const connection = mysql2.createConnection({
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
    "CREATE TABLE IF NOT EXISTS tracks( id INT PRIMARY KEY AUTO_INCREMENT, cover_name VARCHAR(255) NOT NULL, audiofile_name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, genre VARCHAR(50) NOT NULL, bpm DECIMAL(5, 2) NOT NULL, tone DECIMAL(5, 2) NOT NULL, author VARCHAR(255) DEFAULT 'guest')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  sql =
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(50), age INT NOT NULL, role VARCHAR(50) DEFAULT 'user')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
});

// Экспорт подключения для использования в других модулях
export default connection;
