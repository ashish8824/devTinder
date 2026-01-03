const express = require("express");
const authRouter = express.Router();
const validateSignUpData = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter;

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Inavlid credentials");
    }

    const isValidData = await user.validatePassword;
    if (!isValidData) {
      throw new Error("Inavlid credentials");
    }

    //Creating token using jwt
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send("login successfully");
  } catch (err) {
    res.status(400).send("Something went wrong !" + err.message);
  }
});

module.exports = authRouter;
