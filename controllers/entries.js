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
      name: req.session.name,
      role: req.session.role,
      entries: entries,
    });
  });
}

export default { list };
