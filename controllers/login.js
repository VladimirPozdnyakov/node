import logger from "../logger/index.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const form = (req, res) => {
  res.render("./partials/loginModal", { title: "Login" });
};

const submit = (req, res, next) => {
  User.authenticate(req.body.loginForm, (err, data) => {
    //data is user
    if (err) return next(err);
    if (!data) {
      console.log("Почта и/или пароль неверны!");
      logger.error("Ошибка ввода пароля или почты");
      return res.redirect("/");
    }
    if (data) {
      req.session.email = data.email;
      req.session.name = data.name;
      req.session.password = data.password;
      req.session.role = data.role;
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
      console.log("Токен подготовлен");
      logger.info("Токен подготовлен:" + token);

      res.redirect("/");
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  req.session.destroy((err) => {
    if (err) {
      logger.error("Ошибка выхода");
      console.log(err.message);
    }
    return res.redirect("/");
  });
};

export default { form, submit, logout };
