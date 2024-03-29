import logger from "../logger/index.js";

const validatePassword = (req, res, next) => {
  const password = req.body.password;
  let errorMessage = [];

  // Проверка длины пароля (минимум 8 символов)
  if (password.length < 8) {
    errorMessage.push("Пароль должен содержать не менее 8 символов. ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Пароль должен содержать не менее 8 символов.");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Ошибка пароля - менее 8 символов");
  }
  // Проверка наличия хотя бы одной цифры
  if (!/\d/.test(password)) {
    errorMessage.push("Пароль должен содержать хотя бы одну цифру. ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    console.log("Пароль должен содержать хотя бы одну цифру. ");
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Ошибка пароля - нет хотя бы одной цифры. ");
  }
  // Проверка наличия хотя бы одной буквы в верхнем регистре
  if (!/[A-ZА-Я]/.test(password)) {
    errorMessage.push(
      "Пароль должен содержать хотя бы одну букву в верхнем регистре. "
    );
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    console.log(
      "Пароль должен содержать хотя бы одну букву в верхнем регистре"
    );
    console.log("! ! !");
    console.log("! ! !");
    logger.error(
      "Ошибка пароля - нет хотя бы одной буквы в верхнем регистре. "
    );
  }
  // Проверка наличия хотя бы одной буквы в нижнем регистре
  if (!/[a-zа-я]/.test(password)) {
    errorMessage.push(
      "Пароль должен содержать хотя бы одну букву в нижнем регистре. "
    );
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    console.log(
      "Пароль должен содержать хотя бы одну букву в нижнем регистре. "
    );
    console.log("! ! !");
    console.log("! ! !");
    logger.error("Ошибка пароля - нет хотя бы одной буквы в нижнем регистре. ");
  }

  // Если есть ошибка, добавляем её на страницу
  if (errorMessage !== "") {
    res.locals.errorMessage = errorMessage;
  }
  next();
};

export default validatePassword;
