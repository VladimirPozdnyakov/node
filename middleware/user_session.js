import User from "../models/user.js";
export default (req, res, next) => {
  if (req.session.email) {
    User.findByEmail(req.session.email, (err, userData) => {
      if (err) return next(err);
      if (userData) req.user = res.locals.user = userData;
    });
  }
  if (req.session.passport) {
    res.locals.user = req.session.passport.user;
  }
  next();
};
