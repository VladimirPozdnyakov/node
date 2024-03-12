import pkg from "express";
const { Express } = pkg;
import logger from "../logger/index.js";

export default function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  logger.info("Authenticated");
  res.redirect("/login");
}
