import express from "express";
const app = express();

const port = 3000;

app.get("/as", function (req, res) {
  res.send("Hello students!");
});

// npm run dev
app.listen(port, () => {
  console.log("listerning on", port, "port");
});
