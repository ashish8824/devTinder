const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //read the token
    const cookie = req.cookies;
    const { token } = cookie;

    if (!token) {
      throw new Error("Invalid token |");
    }

    //validate token
    const decodedData = await jwt.verify(token, "dev@Tinder");
    const { _id } = decodedData;

    //getting data
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found |");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = userAuth;
