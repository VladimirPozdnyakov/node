import express from "express";
const app = express();

app.use(express.json()); // middleware для обработки JSON данных
app.use(express.urlencoded({ extended: true })); // middleware для обработки данных формы

// Middleware для валидации данных пароля
const validatePassword = (req, res, next) => {
  const { password } = req.body;

  // Проверяем, что пароль содержит минимум 8 символов
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Пароль должен содержать минимум 8 символов" });
  }

  // Проверяем, что пароль содержит хотя бы одну цифру
  if (!/\d/.test(password)) {
    return res
      .status(400)
      .json({ error: "Пароль должен содержать хотя бы одну цифру" });
  }

  // Проверяем, что пароль содержит хотя бы одну заглавную букву
  if (!/[A-Z]/.test(password)) {
    return res
      .status(400)
      .json({ error: "Пароль должен содержать хотя бы одну заглавную букву" });
  }

  // Если все проверки пройдены, вызываем следующий middleware
  next();
};

app.post("/register", validatePassword, (req, res) => {
  // Действия при успешной валидации пароля
  res.send("Пароль прошел валидацию");
});

// Обработчик ошибки при невалидном пароле
app.use((err, req, res, next) => {
  res.status(400).send("Ошибка: " + err.message);
});

export default validatePassword;
