const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

console.log(__dirname + "/public/favicon.png");

app.use(favicon(__dirname + "/public/favicon.png"));

const port = 3000;

app.get("/as", function (req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
app.post("/as", function (req, res) {
  console.log(req.body);
});

// npm run dev
app.listen(port, () => {
  console.log("listerning on", port, "port");
});
