import logger from "../logger/index.js";

export default function ensureAuthenticated(req, res, next) {
  if (res.isAuthenticated()) {
    return next();
  }
  logger.info("Authenticated");
  res.redirect("/login");
}
