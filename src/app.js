const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Data save successfully");
  } catch (err) {
    res.status(400).send("Error in saving data");
  }
});

//Get user by emailId
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const userInfo = await User.find({ emailId: userEmail });
    if (userInfo.length === 0) {
      res.status(400).send("User not found!!");
    }
    res.send(userInfo);
  } catch (err) {
    res.status(400).send("Something went wrong !");
  }
});

//Feed API - Getting information of all the users from database

app.get("/feed", async (req, res) => {
  try {
    const usersData = await User.find({});
    res.send(usersData);
  } catch (err) {
    res.send(400).send("Something went wrong ");
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
