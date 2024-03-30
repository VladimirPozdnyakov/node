import logger from "../logger/index.js";
// import User from "../models/user.js";
import User from "../models/db2.js";
import jwt from "jsonwebtoken";

const form = (req, res) => {
  res.render("login", { title: "Login" });
  console.log("...");
  console.log("заход на /login");
};

async function authenticate(dataForm, cb) {
  try {
    const user = await User.findOne({ where: { email: dataForm.email } });
    if (!user) return cb();
    if (dataForm.password === user.password) {
      return cb(null, user);
    } else return cb();
  } catch (err) {
    return cb(err);
  }
}

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
      console.log("Всё верно!");
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

      //jwt cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      console.log("...");
      console.log("куки подготовлен");

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
