const express = require("express");
const app = express();

app.use("/user", (req, res) => {
  res.send("HAHAHAHAAH");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Ashish", lastName: "Anand" });
});

app.post("/user", (req, res) => {
  res.send("Data has saved in the db");
});

app.delete("/user", (req, res) => {
  res.send("deleted successfully");
});

app.put("/user", (req, res) => {
  res.send("data updated successfully");
});

app.listen(7777, () =>
  console.log("sever is running successfully on port 7777")
);
