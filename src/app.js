const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate data
    validateSignUpData(req);

    //encrypt password
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.send("Data save successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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

//Update user's information in the database
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;

    const data = req.body;

    console.log(userId);

    const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allow");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    // await User.findOneAndUpdate({ _id: userId }, data);
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    // const user = await User.findByIdAndUpdate(userId, data);
    // console.log("updated data", user);
    res.send("Updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!!" + err.message);
  }
});

//delete data from database
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findOneAndDelete(userId);
    res.send("Deleted user successfully");
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
