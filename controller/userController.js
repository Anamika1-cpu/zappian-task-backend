const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register a user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Please enter your email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }

  sendToken(user, 200, res);
};

//Logout user
exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

//update User Profile
exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    succes: true,
  });
};

exports.deleteUserProfile = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  console.log(user);
  if (!user) {
    res.json({ message: `User doesnot exist with id:${req.params.id}` });
  }
  res.status(200).json({
    succes: true,
    message: "User deleted successfully",
  });
};
