import User from "../models/user.js";
import validatePassword from "../middleware/passwordValidation.js";

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
    if (res.locals.errorMessage) {
      return form(req, res);
    }

    User.findByEmail(req.body.email, (err, user) => {
      if (err) return next(err);
      if (!user) {
        User.create(req.body, (err) => {
          if (err) return next(err);
          res.redirect("/");
        });
      } else {
        console.log("...");
        console.log("Такой пользователь уже существует!");
        res.redirect("back");
      }
    });
  },
];

export default { form, submit };
