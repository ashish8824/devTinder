const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;

    console.log("sending connection");

    res.send(user.firstName + " is sending connection");
  } catch (err) {
    res.status(400).send("Something went wrong !" + err.message);
  }
});

module.exports = requestRouter;
