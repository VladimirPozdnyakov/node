import User from "../models/user.js";
import validatePassword from "../middleware/passwordValidation.js";
import validator from "validator";

const form = (req, res) => {
  res.render("registerForm", {
    title: "Register",
    errorMessage: res.locals.errorMessage,
  });
  console.log("...");
  console.log("заход на /register");
};

const submit = [
  validatePassword,
  (req, res, next) => {
    const email = req.body.email;
    if (!validator.isEmail(email) || !/@(mail\.ru|yandex\.ru)$/.test(email)) {
      res.locals.errorMessage.push(
        "Принимаются электронные почты только mail.ru и yandex.ru"
      );
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
          res.redirect("/");
        });
      } else {
        console.log("...");
        console.log("Такой пользователь уже существует!");
        res.redirect("/");
      }
    });
  },
];

export default { form, submit };
