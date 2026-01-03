const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 50,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Inavlid email" + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password " + value);
        }
      },
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Other"].includes(value))
          throw new Error("gnder is not valid");
      },
    },
    about: {
      type: String,
      default: "This is a default about",
    },
    photoUrl: {
      type: String,
      default:
        "https://www.clipartmax.com/png/small/296-2969961_no-image-user-profile-icon.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter valid Photo Url" + value);
        }
      },
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "dev@Tinder", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;

  isValidData = await bcrypt.compare(passwordInputByUser, hashedPassword);

  return isValidData;
};

module.exports = mongoose.model("User", userSchema);
