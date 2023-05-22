const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Please enter your name"],
    maxLength: [30, "Name must be less than 30 characters"],
    minLength: [5, "Name should be at least than 8 characters"],
  },
  email: {
    type: "String",
    required: [true, "Please enter your email address"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: "String",
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be greater than 8 characters"],
    select: false,
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
schema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "Anamika", {
    expiresIn: "5d",
  });
};

//Compare pasasword
schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", schema);
