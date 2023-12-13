import User from "../models/user.js";
const form = (req, res) => {
  res.render("login", { title: "chepokrashka" });
  console.log("...");
  console.log("заход на /login");
};
const submit = (req, res, next) => {
  User.authenticate(req.body.loginForm, (err, data) => {
    //data is user
    if (err) return next(err);
    if (!data) {
      console.log("...");
      console.log("Имя или пароль не верны!");
      redirect("back");
    }
    if (data) {
      // req.session.userEmail = data.email;
      req.session.email = data.email;
      // req.session.userName = data.name;
      req.session.name = data.name;
      // req.session.userPassword = data.password;
      req.session.password = data.password;
      res.redirect("/");
    }
  });
};
export default { form, submit };
