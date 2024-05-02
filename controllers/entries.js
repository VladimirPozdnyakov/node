import logger from "../logger/index.js";
import Entry from "../models/entry.js";

function list(req, res, next) {
  Entry.selectAll((err, entries) => {
    if (err) {
      logger.error(err.message);
      return next(err);
    }

    res.render("entries", {
      title: "Главная страница",
      email: req.session.email,
      role: req.session.role,
      entries: entries,
    });
  });
}

function form(req, res) {
  res.render("post", { title: "Post" });
}

function submit(req, res, next) {
  const username = req.user ? req.user.name : null;
  const { title, content } = req.body.entry;

  try {
    Entry.create({ username, title, content });
    res.redirect("/");
  } catch (err) {
    logger.error(`Ошибка: ${err.message}`);
    return next(err);
  }
}

export default { list, form, submit };
