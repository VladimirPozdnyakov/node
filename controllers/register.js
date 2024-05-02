import User from "../models/user.js";
import validatePassword from "../middleware/validation.js";
import validator from "validator";
import logger from "../logger/index.js";
import jwt from "jsonwebtoken";

const form = (req, res) => {
  res.render("registerModal", {
    title: "Регистрация",
    errorMessage: res.locals.errorMessage,
  });
};

const submit = [
  validatePassword,
  (req, res, next) => {
    const email = req.body.email;
    if (!validator.isEmail(email) || !/@(mail\.ru|yandex\.ru)$/.test(email)) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      res.locals.errorMessage.push(
        "Принимаются электронные почты только mail.ru и yandex.ru"
      );
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Неправильно записан email");
      return form(req, res);
    }

    if (res.locals.errorMessage && res.locals.errorMessage.length > 0) {
      return form(req, res);
    }

    User.findByEmail(email, (err, user) => {
      if (err) return next(err);
      if (!user) {
        User.create(req.body, (err) => {
          if (err) return next(err);
          res.redirect("/login");
          console.log("...");
          console.log("произведена регистрация");
          console.log("...");
          logger.info("произведена регистрация");

          //jwt
          const token = jwt.sign(
            {
              email: req.body.email,
            },
            process.env.JWTTOKENSECRET,
            {
              expiresIn: process.env.JWTTOKENTIME,
            }
          );
        });
      } else {
        console.log("! ! !");
        console.log("! ! !");
        console.log("! ! !");
        console.log("ошибка ");
        console.log("! ! !");
        console.log("! ! !");
        res.locals.errorMessage.push("Такой пользователь уже существует!");
        console.log("...");
        logger.error("Такой пользователь уже существует");
        return form(req, res);
      }
    });
  },
];

export default { form, submit };
