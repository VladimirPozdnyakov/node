import logger from "../logger/index.js";
import Entry from "../models/entry.js";

function list(req, res, next) {
  Entry.selectAll((err, entries) => {
    if (err) {
      logger.error(err.message);
      return next(err);
    }

    res.render("entries", {
      title: "Каталог",
      name: req.session.name,
      role: req.session.role,
      entries: entries,
    });
  });
}

function about(req, res, next) {
  res.render("about", {
    title: "О нас",
    name: req.session.name,
    role: req.session.role,
  });
}

function where(req, res, next) {
  res.render("where", {
    title: "Где нас найти?",
    name: req.session.name,
    role: req.session.role,
  });
}

function orders(req, res, next) {
  Entry.selectAll((err, entries) => {
    if (err) {
      logger.error(err.message);
      return next(err);
    }

    res.render("orders", {
      title: "Мои резервы",
      name: req.session.name,
      role: req.session.role,
      entries: entries,
    });
  });
}

function admin(req, res, next) {
  Entry.selectAll((err, entries) => {
    if (err) {
      logger.error(err.message);
      return next(err);
    }

    res.render("admin", {
      title: "Панель администратора",
      name: req.session.name,
      role: req.session.role,
      entries: entries,
    });
  });
}

export default { list, about, where, orders, admin };
