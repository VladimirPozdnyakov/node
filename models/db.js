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
  if (err) {
    console.error("Ошибка подключения к БД: " + err.stack);
    return;
  }
  console.log("Подключение к БД успешно установлено");
});

// Экспорт подключения для использования в других модулях
export default connection;
