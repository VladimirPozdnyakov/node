import logger from "../logger/index.js";
// import Entry from "../models/entry.js";
import Entry from "../models/db2.js";

const list = async (req, res, next) => {
  try {
    await Entry.findAll();
    res.render("entries", {
      title: "Главная страница",
      email: req.session.email,
      role: req.session.role,
      entries: entries,
    });
    console.log("...");
    console.log("заход на /");
    console.log("...");
    logger.info("Заход на главную страницу");
  } catch (err) {
    return next(err);
  }
};

const form = (req, res, next) => {
  res.render("post", { title: "Post" });
};

const submit = async (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    await Entry.create(entry);
    res.redirect("/");
  } catch (err) {
    console.log("! ! !");
    console.log("! ! !");
    console.log("! ! !");
    console.log("ошибка ");
    console.log("! ! !");
    console.log("! ! !");
    logger.error(err.message);
    return next(err);
  }
};

export default { list, form, submit };
