import mysql from "mysql";

// Создание подключения к БД
const connection = mysql.createConnection({
  host: "localhost", // Имя хоста БД
  port: "3306", // Порт хоста ДБ
  user: "root", // Имя пользователя БД
  password: "13151211", // Пароль пользователя БД
  database: "nodeproject", // Имя БД
});

// Подключение к БД
connection.connect((err) => {
  if (err) throw err;
  console.log("Соединение с БД установлено!");

  let sql =
    "CREATE TABLE IF NOT EXISTS posts( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body TEXT,author VARCHAR(255) DEFAULT 'Гость')";
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
