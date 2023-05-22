const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: "Please login to access this source" });
  }
  const decodedData = jwt.verify(token, "Anamika");

  req.user = await User.findById(decodedData.id);
  next();
};
