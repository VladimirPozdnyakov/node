const list = (req, res) => {
  res.render("main", { title: "chepokrashka" });
  console.log("...");
  console.log("заход на /");
};

export default { list };
