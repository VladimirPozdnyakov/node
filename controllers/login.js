import User from "../models/user.js";

const form = (req, res) => {
  res.render("login", { title: "Login" });
  console.log("...");
  console.log("заход на /login");
};
const submit = (req, res, next) => {
  User.authenticate(req.body.loginForm, (err, data) => {
    //data is user
    if (err) return next(err);
    if (!data) {
      console.log("...");
      console.log("Имя или пароль неверны!");
      return form(req, res);
    }
    if (data) {
      req.session.email = data.email;
      req.session.name = data.name;
      req.session.password = data.password;
      req.session.role = data.role;
      console.log("...");
      console.log("Всё верно!");
      res.redirect("/");
    }
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/error"); // перенаправляем на страницу ошибки, если есть ошибка
    }
    return res.redirect("/"); // перенаправляем на главную страницу после выхода
  });
};

export default { form, submit, logout };
