import User from "../models/user.js";
export default (req, res, next) => {
  if (req.session.email) {
    User.findByEmail(req.session.email, (err, userData) => {
      if (err) return next(err);
      if (userData) req.user = res.locals.user = userData;
      next();
    });
  } else if (req.session.passport) {
    req.user = res.locals.user = req.session.passport.user;
    req.session.email = req.session.passport.user.email;
    next();
  } else {
    return next();
  }
};
