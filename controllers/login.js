import logger from "../logger/index.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const form = (req, res) => {
  res.render("loginModal", { title: "Login" });
  console.log("...");
};

const submit = (req, res, next) => {
  User.authenticate(req.body.loginForm, (err, data) => {
    //data is user
    if (err) return next(err);
    if (!data) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("Имя и/или пароль неверны!");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка ввода пароля");
      return form(req, res);
    }
    if (data) {
      req.session.email = data.email;
      req.session.name = data.name;
      req.session.password = data.password;
      req.session.role = data.role;
      console.log("...");
      logger.info("Заход произведён" + " " + data.name + " " + data.email);

      //jwt
      const token = jwt.sign(
        {
          email: data.email,
        },
        process.env.JWTTOKENSECRET,
        {
          expiresIn: process.env.JWTTOKENTIME,
        }
      );
      console.log("...");
      console.log("токен подготовлен");
      console.log("...");
      logger.info("токен подготовлен:" + token);

      res.redirect("/");
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  req.session.destroy((err) => {
    if (err) {
      console.log("! ! !");
      console.log("! ! !");
      console.log("! ! !");
      console.log("ошибка ");
      console.log("! ! !");
      console.log("! ! !");
      logger.error("Ошибка выхода");
      console.log(err.message);
    }
    return res.redirect("/"); // перенаправляем на главную страницу после выхода
  });
};

export default { form, submit, logout };
