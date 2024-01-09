import Entry from "../models/entry.js";

const list = (req, res, next) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    res.render("entries", {
      title: "Главная страница",
      email: req.session.email,
      entries: entries,
    });
    console.log("...");
    console.log("заход на /");
  });
};

const form = (req, res, next) => {
  res.render("post", { title: "Post" });
};

const submit = (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    Entry.create(entry);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export default { list, form, submit };
