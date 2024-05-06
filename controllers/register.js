import User from "../models/user.js";
import validatePassword from "../middleware/validation.js";
import validator from "validator";
import logger from "../logger/index.js";

const submit = [
  validatePassword,
  (req, res, next) => {
    const email = req.body.email;
    if (!validator.isEmail(email) || !/@(mail\.ru|yandex\.ru)$/.test(email)) {
      console.log("Принимаются электронные почты только mail.ru и yandex.ru");
      res.locals.errorMessage.push(
        "Принимаются электронные почты только mail.ru и yandex.ru"
      );
      logger.error("Неправильно записан email");
      return res.redirect("/");
    }

    if (res.locals.errorMessage && res.locals.errorMessage.length > 0) {
      return res.redirect("/");
    }

    User.findByEmail(email, (err, user) => {
      if (err) return next(err);
      if (!user) {
        User.create(req.body, (err) => {
          if (err) return next(err);
          res.redirect("/");
          console.log("Произведена регистрация");
          logger.info("Произведена регистрация");
        });
      } else {
        console.log("Такой пользователь уже существует!");
        res.locals.errorMessage.push("Такой пользователь уже существует!");
        logger.error("Такой пользователь уже существует");
        return res.redirect("/");
      }
    });
  },
];

export default { submit };
