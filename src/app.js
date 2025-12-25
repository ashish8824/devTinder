const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
  res.send("hello from backend");
});

app.use("/dashboard", (req, res) => {
  res.send("hello from dashboard");
});

app.listen(7777, () =>
  console.log("sever is running successfully on port 7777")
);
