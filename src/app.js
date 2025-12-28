const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@123.com",
    password: "Ashish123",
  });

  try {
    await user.save();
    res.send("Data save successfully");
  } catch (err) {
    res.status(400).send("Error in saving data");
  }
});

connectDB()
  .then(() => {
    console.log("connected to DB suceesfully");
    app.listen(7777, () =>
      console.log("sever is running successfully on port 7777")
    );
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
