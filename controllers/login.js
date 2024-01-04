import User from "../models/user.js";

const form = (req, res) => {
  res.render("login", { title: "chepokrashka" });
  console.log("...");
  console.log("заход на /login");
};
const submit = (req, res, next) => {
  User.authentificate(req.body.loginForm, (err, data) => {
    //data is user
    if (err) return next(err);
    if (!data) {
      console.log("...");
      console.log("Имя или пароль неверны!");
      res.redirect("back");
    }
    if (data) {
      // req.session.userEmail = data.email;
      req.session.email = data.email;
      // req.session.userName = data.name;
      req.session.name = data.name;
      // req.session.userPassword = data.password;
      req.session.password = data.password;
      console.log("...");
      console.log("Всё верно!");
      res.redirect("/");
    }
  });
};
const logout = (req, res, err, next) =>
  req.session.destroy((req, res, err) => {
    if (err) return next(err);
  });
export default { form, submit, logout };
