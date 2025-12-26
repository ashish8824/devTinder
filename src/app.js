const express = require("express");
const app = express();

app.use("/user", [
  (req, res, next) => {
    console.log("1st respone");
    next();
    // res.send("sending back 1st respone");
  },
  (req, res, next) => {
    console.log("2nd respone");
    // res.send("sending back 2nd respone");
    next();
  },
  (req, res, next) => {
    console.log("3rd respone");
    res.send("sending back 3rd respone");
    next();
  },
]);

app.listen(7777, () =>
  console.log("sever is running successfully on port 7777")
);
